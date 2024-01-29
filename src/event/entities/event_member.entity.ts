import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Event } from './event.entity';

@Entity({ name: 'event_member' })
export class EventMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Event, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @ManyToOne(() => User, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: Boolean,
    name: 'is_owner',
    default: false,
  })
  isOwner: boolean;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}

export const EventMemberRepo = TypeOrmModule.forFeature([EventMember]);
