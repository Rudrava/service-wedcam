import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'text',
    default: null,
  })
  lastName: string;

  @Column({
    name: 'user_type',
    type: 'enum',
    enum: EUserType,
    default: EUserType.user,
  })
  userType: EUserType;

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
