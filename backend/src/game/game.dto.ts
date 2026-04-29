import { IsString, MinLength, IsUUID } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  @MinLength(2)
  name!: string; // player name
}

export class JoinSessionDto {
  @IsUUID()
  sessionId!: string;

  @IsString()
  name!: string;
}

export class CreateQuestionDto {
  @IsString()
  @MinLength(3)
  question!: string;

  @IsString()
  @MinLength(1)
  answer!: string;
}

export class GuessDto {
  @IsString()
  @MinLength(1)
  guess!: string;
}