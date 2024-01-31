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
  ApiOperation,
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
  @ApiOperation({
    description:
      'Logs in the user, if email DNE then creates a new one and logs in',
  })
  async login(@Body() data: LoginDto) {
    return this.auth.login(data);
  }

  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse()
  @ApiBearerAuth()
  @Get('/me')
  @ApiOperation({
    description: 'Gets the logged in user via the user token',
  })
  async getMe(@CurrentUser() user: User) {
    return user;
  }
}
