import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'event' })
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'timestamp',
    name: 'start_at',
  })
  startAt: Date;

  @Column({
    type: 'timestamp',
    name: 'end_at',
  })
  endAt: Date;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @DeleteDateColumn({})
  public deleted_at: Date;
}

export const EventRepo = TypeOrmModule.forFeature([Event]);
