import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import tags from 'constants/swagger-tags';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { JwtAuthGuard } from './jwt';
import { CurrentUser } from 'src/lib/decorators';
import { User } from 'src/user/entities';
import { ResponseInterceptor } from 'src/lib/interceptors';

@Controller({
  path: 'auth',
  version: '0',
})
@ApiTags(tags.authTag.name)
@UseInterceptors(ResponseInterceptor)
export class AuthController {
  logger = new Logger(AuthController.name);
  constructor(private readonly auth: AuthService) {}
  @Post('/login')
  async login(@Body() data: LoginDto) {
    return this.auth.login(data);
  }

  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse()
  @ApiBearerAuth()
  @Get('/me')
  async getMe(@CurrentUser() user: User) {
    return user;
  }
}
