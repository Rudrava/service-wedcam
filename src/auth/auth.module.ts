import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { TokenRepo } from './entities';
import { JWTModule } from './jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [JWTModule, UserModule, TokenRepo],
  providers: [UserService, AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
