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
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import swaggerTags from 'constants/swagger-tags';
import { JwtAuthGuard } from 'src/auth/jwt';
import { CurrentUser } from 'src/lib/decorators';
import { ResponseInterceptor } from 'src/lib/interceptors';
import { User } from 'src/user/entities';
import { CreateEventDto } from './dto/create-event.dto';
import { EventService } from './event.service';

@Controller('event')
@UseGuards(JwtAuthGuard)
@ApiTags(swaggerTags.eventTag.name)
@UseInterceptors(ResponseInterceptor)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Creates an event',
  })
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
  @ApiOperation({
    description: 'To join in an event :id is the uuid of the event',
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
  @ApiOperation({
    description: 'Get all members of the event',
  })
  @Get('/:id/members')
  getMembers(@Param('id') id: string) {
    return this.eventService.getMembers(id);
  }

  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiBearerAuth()
  @Get('/mine')
  @ApiOperation({
    description: 'Get all the events the logged in user has joined ',
  })
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
  @ApiOperation({
    description:
      'Get details of the event (via passed in id). Future implementation would only give this info to people who scanned the code or are joined in.',
  })
  @Get('/:id')
  getEventById(@CurrentUser() user: User, @Param('id') id: string) {
    return this.eventService.getById(id, user.id);
  }
}
