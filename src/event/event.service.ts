import { BadRequestException, Body, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  logger = new Logger(EventService.name);
  constructor(
    @InjectRepository(Event) private readonly eventRepo: Repository<Event>,
  ) {}
  async create(ownerId: string, @Body() data: CreateEventDto) {
    const event = this.eventRepo.create({
      name: data.name,
      description: data.description,
      startAt: new Date(data.startAt),
      endAt: new Date(data.endAt),
      owner: {
        id: ownerId,
      },
    });
    try {
      await this.eventRepo.save(event);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('Error creating event.');
    }
  }
}
