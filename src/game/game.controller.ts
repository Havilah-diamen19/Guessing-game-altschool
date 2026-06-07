import {
  Controller,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

 @Get("/")
  health() {
    return 'OK';
  }

  // GET /game/session/:id — fetch session details
  @Get('session/:id')
  async getSession(@Param('id') id: string) {
    const session = await this.gameService.getSession(id);
    if (!session) throw new NotFoundException('Session not found');
    return session;
  }

  // GET /game/session/:id/players — fetch all players in a session
  @Get('session/:id/players')
  async getPlayers(@Param('id') id: string) {
    return this.gameService.getPlayers(id);
  }

  // GET /game/session/:id/leaderboard — scores ranked
  @Get('session/:id/leaderboard')
  async getLeaderboard(@Param('id') id: string) {
    return this.gameService.getLeaderboard(id);
  }
}