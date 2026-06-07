import { Session } from './entities/game-entity';
import { Player } from './entities/player-entity';

export class GameMapper {
  static toSessionDTO(session: Session) {
    return {
      id: session.id,
      status: session.status,
      question: session.question,
      winnerId: session.winnerId,
      expiresAt: session.expiresAt,
      players: session.players?.map(this.toPlayerDTO),
    };
  }

  static toPlayerDTO(player: Player) {
    return {
      id: player.id,
      username: player.username,
      score: player.score,
      attemptsLeft: player.attempts,
      isGameMaster: player.isGameMaster,
    };
  }

  static toGameState(session: Session) {
    return {
      sessionId: session.id,
      status: session.status,
      question: session.question,
      players: session.players?.map(this.toPlayerDTO),
    };
  }
}