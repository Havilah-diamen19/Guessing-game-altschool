import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
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

  // ✅ GAME MASTER AS RELATION
  @ManyToOne(() => Player, { nullable: true })
  @JoinColumn({ name: 'game_master_id' })
  gameMaster!: Player | null;

  @Column({ name: 'game_master_id', nullable: true })
  gameMasterId!: string | null;

  // ✅ RELATION (not column)
  @OneToMany(() => Player, (player) => player.session, {
    cascade: true,
  })
  players!: Player[];

  @Column({ type: 'varchar', nullable: true })
  question!: string | null;

  @Column({ type: 'varchar', nullable: true })
  answer!: string | null;

  @Column({ name: 'winner_id',type: 'varchar', nullable: true })
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