import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventMember } from './event_member.entity';

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

  @OneToMany(() => EventMember, (eventMember) => eventMember.event, {
    nullable: true,
  })
  members: EventMember[];

  @Column()
  venue: string;

  @Column({
    name: 'estimated_participants',
  })
  estimatedParticipants: number;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @ManyToOne(() => User, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @DeleteDateColumn({})
  public deleted_at: Date;
}

export const EventRepo = TypeOrmModule.forFeature([Event]);
