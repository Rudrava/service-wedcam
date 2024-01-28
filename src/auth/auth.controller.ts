import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import tags from 'constants/swagger-tags';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';

@Controller({
  path: 'auth',
  version: '0',
})
@ApiTags(tags.authTag.name)
export class AuthController {
  logger = new Logger(AuthController.name);
  constructor(private readonly auth: AuthService) {}
  @Post('/login')
  async login(@Body() data: LoginDto) {
    return this.auth.login(data);
  }
}
