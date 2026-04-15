import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Player } from './player.entity';
import { Session } from './session.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Player) private playerRepo: Repository<Player>,
    @InjectRepository(Session) private sessionRepo: Repository<Session>,
  ) {}

  async createSession(username: string, socketId: string) {
    const session = this.sessionRepo.create({
      gameMasterId: socketId,
    });

    await this.sessionRepo.save(session);

    const player = this.playerRepo.create({
      username,
      id: socketId,
      sessionId: session.id,
    });

    await this.playerRepo.save(player);

    return session;
  }

  async joinSession(sessionId: string, username: string, socketId: string) {
    const session = await this.sessionRepo.findOneBy({ id: sessionId });

    if (!session || session.status !== 'waiting') return null;

    const player = this.playerRepo.create({
      id: socketId,
      username,
      sessionId,
    });

    await this.playerRepo.save(player);

    return session;
  }

  async startGame(sessionId: string, question: string, answer: string) {
    const session = await this.sessionRepo.findOneBy({ id: sessionId });

    const players = await this.playerRepo.findBy({ sessionId });

    if (players.length < 3) throw new Error('Need at least 3 players');

    session.status = 'in_progress';
    session.question = question;
    session.answer = answer.toLowerCase();
    session.expiresAt = new Date(Date.now() + 60000);

    await this.sessionRepo.save(session);

    for (const player of players) {
      player.attemptsLeft = 3;
      await this.playerRepo.save(player);
    }

    return { session, players };
  }

  async submitGuess(sessionId: string, socketId: string, guess: string) {
    const session = await this.sessionRepo.findOneBy({ id: sessionId });

    if (!session || session.status !== 'in_progress') return;

    const player = await this.playerRepo.findOneBy({
      id: socketId,
      sessionId,
    });

    if (!player || player.attemptsLeft <= 0) return;

    player.attemptsLeft--;

    if (guess.toLowerCase() === session.answer) {
      player.score += 10;
      session.status = 'ended';
      session.winnerId = player.id;

      await this.playerRepo.save(player);
      await this.sessionRepo.save(session);

      return { correct: true, player };
    }

    await this.playerRepo.save(player);

    return { correct: false, attemptsLeft: player.attemptsLeft };
  }
}