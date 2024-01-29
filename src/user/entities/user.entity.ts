import { TypeOrmModule } from '@nestjs/typeorm';
import { EventMember } from 'src/event/entities/event_member.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum EUserType {
  user = 'user',
  admin = 'admin',
}
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'first_name',
    type: 'text',
    default: null,
    nullable: true,
  })
  firstName: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  email: string;

  @Column({
    name: 'last_name',
    type: 'text',
    default: null,
    nullable: true,
  })
  lastName: string;

  @Column({
    name: 'user_type',
    type: 'enum',
    enum: EUserType,
    default: EUserType.user,
  })
  userType: EUserType;

  @OneToMany(() => EventMember, (eventMember) => eventMember.user, {
    nullable: true,
  })
  events: EventMember[];

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @DeleteDateColumn({})
  public deleted_at: Date;
}

export const UserRepo = TypeOrmModule.forFeature([User]);
