import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Server } from 'socket.io';

import { Player } from './entities/player-entity';
import { Session } from './entities/game-entity';
import { SessionStatus } from './enums/session-enum';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Session)
    private sessionRepo: Repository<Session>,

    @InjectRepository(Player)
    private playerRepo: Repository<Player>,
  ) {}

  private server!: Server;

  setServer(server: Server) {
    this.server = server;
  }

  // =========================
  // CREATE SESSION
  // =========================
  async createSession(username: string, socketId: string) {
    const session = await this.sessionRepo.save(
      this.sessionRepo.create({
        status: SessionStatus.WAITING,
      }),
    );

    const player = await this.playerRepo.save(
      this.playerRepo.create({
        id: socketId,
        username,
        sessionId: session.id,
        score: 0,
        attempts: 3,
        isGameMaster: true,
      }),
    );

    session.gameMasterId = player.id;
    await this.sessionRepo.save(session);

    return session;
  }

  // =========================
  // JOIN SESSION
  // =========================
  async joinSession(sessionId: string, username: string, socketId: string) {
    const session = await this.sessionRepo.findOne({
      where: { id: sessionId },
    });

    if (!session) throw new BadRequestException('Session not found');

    if (session.status !== SessionStatus.WAITING) {
      throw new BadRequestException('Game already started');
    }

    await this.playerRepo.save(
      this.playerRepo.create({
        id: socketId,
        username,
        sessionId,
        score: 0,
        attempts: 3,
        isGameMaster: false,
      }),
    );

    return session;
  }

  // =========================
  // START GAME
  // =========================
  async startGame(sessionId: string, question: string, answer: string) {
    const session = await this.sessionRepo.findOne({
      where: { id: sessionId },
    });

    if (!session) throw new BadRequestException('Session not found');

    const players = await this.playerRepo.findBy({ sessionId });

    if (players.length < 3) {
      throw new BadRequestException('Need at least 3 players');
    }

    session.status = SessionStatus.IN_PROGRESS;
    session.question = question;
    session.answer = answer.toLowerCase();
    session.expiresAt = new Date(Date.now() + 60000);

    await this.sessionRepo.save(session);

    for (const player of players) {
      player.attempts = 3; // FIXED
    }

    await this.playerRepo.save(players);

    this.startTimer(session.id);

    return session;
  }

  // =========================
  // SUBMIT GUESS
  // =========================
  async submitGuess(sessionId: string, socketId: string, guess: string) {
    const session = await this.sessionRepo.findOne({
      where: { id: sessionId },
    });

    if (!session || session.status !== SessionStatus.IN_PROGRESS) {
      return null;
    }

    const player = await this.playerRepo.findOne({
      where: { id: socketId, sessionId },
    });

    if (!player || player.attempts <= 0) return null;

    player.attempts--;

    if (guess.toLowerCase() === session.answer) {
      player.score += 10;

      session.status = SessionStatus.ENDED;
      session.winnerId = player.id;

      await this.playerRepo.save(player);
      await this.sessionRepo.save(session);

      return {
        correct: true,
        winner: player,
        session,
      };
    }

    await this.playerRepo.save(player);

    return {
      correct: false,
      attemptsLeft: player.attempts,
    };
  }

  // =========================
  // TIMER
  // =========================
  private startTimer(sessionId: string) {
    setTimeout(async () => {
      const session = await this.sessionRepo.findOne({
        where: { id: sessionId },
      });

      if (!session || session.status !== SessionStatus.IN_PROGRESS) return;

      session.status = SessionStatus.ENDED;

      await this.sessionRepo.save(session);

      this.server.to(sessionId).emit('gameEnded', {
        winner: null,
        answer: session.answer,
      });
    }, 60000);
  }
}