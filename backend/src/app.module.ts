import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
});

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // OK for assessment
    }),
    GameModule,
  ],
})
export class AppModule {}