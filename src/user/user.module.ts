import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepo } from './entities';
import { UserController } from './user.controller';

@Module({
  imports: [UserRepo],
  providers: [UserService],
  exports: [UserRepo],
  controllers: [UserController],
})
export class UserModule {}
