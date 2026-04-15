import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { SessionStatus } from '../enums/session-enum';
import { Player } from './player-entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ default: SessionStatus.WAITING })
  status!: SessionStatus;

  @Column()
  gameMasterId!: string;

  @Column()
  players!: Player[];

  @Column({ nullable: true })
  question!: string;

  @Column({ nullable: true })
  answer!: string;

  @Column({ nullable: true })
  winnerId!: string;

  // MySQL SAFE timestamp
  @Column({ type: 'datetime', nullable: true })
  expiresAt!: Date;
}