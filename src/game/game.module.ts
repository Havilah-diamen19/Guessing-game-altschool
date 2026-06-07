import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { Player } from './entities/player-entity';
import { Session } from './entities/game-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameController } from './game.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Session, Player])],
  controllers: [GameController],
  providers: [GameService, GameGateway]
})
export class GameModule {}
