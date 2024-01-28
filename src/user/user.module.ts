import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepo } from './entities';

@Module({
  imports: [UserRepo],
  providers: [UserService],
  exports: [UserRepo],
})
export class UserModule {}
