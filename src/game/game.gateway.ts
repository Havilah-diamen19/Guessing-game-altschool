import {
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class GameGateway {
  constructor(private gameService: GameService) {}

  @WebSocketServer()
  server!: Server;

  afterInit(server: Server) {
    this.gameService.setServer(server);
  }

  // CREATE SESSION
  @SubscribeMessage('create_session')
  async createSession(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { username: string },
  ) {
    const session = await this.gameService.createSession(
      data.username,
      client.id,
    );

    client.join(session.id);

    this.server.to(session.id).emit('session_update', session);

    return session;
  }

  // JOIN SESSION
  @SubscribeMessage('join_session')
  async joinSession(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string; username: string },
  ) {
    const session = await this.gameService.joinSession(
      data.sessionId,
      data.username,
      client.id,
    );

    client.join(data.sessionId);

    this.server.to(data.sessionId).emit('session_update', session);

    return session;
  }

  // START GAME
  @SubscribeMessage('start_game')
  async startGame(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { sessionId: string; question: string; answer: string },
  ) {
    const session = await this.gameService.startGame(
      data.sessionId,
      data.question,
      data.answer,
    );

    this.server.to(session.id).emit('game_started', {
      question: session.question,
      time: 60,
    });

    return session;
  }

  // GUESS
  @SubscribeMessage('submit_guess')
  async submitGuess(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string; guess: string },
  ) {
    const result = await this.gameService.submitGuess(
      data.sessionId,
      client.id,
      data.guess,
    );

    if (!result) return;

    this.server.to(data.sessionId).emit('guess_result', result);

    if (result.correct) {
      this.server.to(data.sessionId).emit('game_ended', result);
    }
  }
}