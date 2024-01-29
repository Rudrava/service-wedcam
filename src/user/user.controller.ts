import {
  Body,
  Controller,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt';
import { CurrentUser } from 'src/lib/decorators';
import { User } from './entities';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import swaggerTags from 'constants/swagger-tags';
import { ResponseInterceptor } from 'src/lib/interceptors';

@Controller('user')
@ApiTags(swaggerTags.userTag.name)
@UseGuards(JwtAuthGuard)
@UseInterceptors(ResponseInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Patch('/')
  async update(@CurrentUser() user: User, @Body() data: UpdateUserDto) {
    return this.userService.update(user.id, data);
  }
}
