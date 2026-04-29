import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SessionStatus } from '../enums/session-enum';
import { Player } from './player-entity';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'enum',
    enum: SessionStatus,
    default: SessionStatus.WAITING,
  })
  status!: SessionStatus;

  @Column({ name: 'game_master_id', nullable: true })
  gameMasterId!: string | null;

  // ✅ RELATION (not column)
  @OneToMany(() => Player, (player) => player.session, {
    cascade: true,
  })
  players!: Player[];

  @Column({ nullable: true })
  question!: string | null;

  @Column({ nullable: true })
  answer!: string | null;

  @Column({ name: 'winner_id', nullable: true })
  winnerId!: string | null;

  @Column({ type: 'int', default: 60 })
  timeLimit!: number;

  @Column({ type: 'datetime', nullable: true })
  expiresAt!: Date | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}