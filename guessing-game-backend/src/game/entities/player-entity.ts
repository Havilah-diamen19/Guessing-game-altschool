import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ default: 0 })
  score: number;

  @Column({ default: 3 })
  attemptsLeft: number;

  @Column()
  sessionId: string;
}