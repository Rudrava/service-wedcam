import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt';
import { CurrentUser } from 'src/lib/decorators';
import { User } from 'src/user/entities';
import { CreateEventDto } from './dto/create-event.dto';
import { EventService } from './event.service';
import swaggerTags from 'constants/swagger-tags';
import { ResponseInterceptor } from 'src/lib/interceptors';

@Controller('event')
@UseGuards(JwtAuthGuard)
@ApiTags(swaggerTags.eventTag.name)
@UseInterceptors(ResponseInterceptor)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiBearerAuth()
  @Post()
  create(@CurrentUser() user: User, @Body() body: CreateEventDto) {
    return this.eventService.create(user.id, body);
  }

  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    required: true,
  })
  @Get('/:id/join')
  joinEvent(@CurrentUser() user: User, @Param('id') id: string) {
    return this.eventService.join(id, user.id);
  }

  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    required: true,
  })
  @Get('/:id/members')
  getMembers(@Param('id') id: string) {
    return this.eventService.getMembers(id);
  }

  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiBearerAuth()
  @Get('/mine')
  getMyEvents(@CurrentUser() user: User) {
    return this.eventService.getUsersEvents(user.id);
  }

  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    required: true,
  })
  @Get('/:id')
  getEventById(@CurrentUser() user: User, @Param('id') id: string) {
    return this.eventService.getById(id, user.id);
  }
}
