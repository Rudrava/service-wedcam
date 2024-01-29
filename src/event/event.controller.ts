import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt';
import { CurrentUser } from 'src/lib/decorators';
import { User } from 'src/user/entities';
import { CreateEventDto } from './dto/create-event.dto';
import { EventService } from './event.service';
import swaggerTags from 'constants/swagger-tags';

@Controller('event')
@UseGuards(JwtAuthGuard)
@ApiTags(swaggerTags.eventTag.name)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiBearerAuth()
  @Post()
  create(@CurrentUser() user: User, @Body() body: CreateEventDto) {
    return this.eventService.create(user.id, body);
  }
}
