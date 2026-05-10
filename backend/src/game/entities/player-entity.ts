import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Session } from './game-entity';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string; // ✅ required (you asked for this)

  @Column({ unique: false, type: 'varchar', length: 100 })
  username!: string;

  @Column({ default: 0 })
  score!: number;

  @Column({ default: 3 })
  attempts!: number;

  @Column({ default: false })
  isGameMaster!: boolean;

  @Column({ default: false })
  hasWon!: boolean;

  // ✅ RELATION BACK TO SESSION
  @ManyToOne(() => Session, (session) => session.players, {
    onDelete: 'CASCADE',
  })
  session!: Session;

  @Column()
  sessionId!: string;

  // Optional: track socket connection
  @Column({ type: 'varchar', nullable: true })
  socketId!: string | null;

  @CreateDateColumn()
  joinedAt!: Date;
}