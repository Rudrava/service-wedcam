import {
  BadRequestException,
  Body,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';
import { EventMember } from './entities/event_member.entity';

@Injectable()
export class EventService {
  logger = new Logger(EventService.name);
  constructor(
    @InjectRepository(Event) private readonly eventRepo: Repository<Event>,
    @InjectRepository(EventMember)
    private readonly eventMemberRepo: Repository<EventMember>,
    private readonly userService: UserService,
  ) {}

  private async findOneById(id: string) {
    try {
      const event = this.eventRepo.findOneByOrFail({
        id,
      });
      return event;
    } catch (e) {
      throw new NotFoundException('Event not found.');
    }
  }

  async create(ownerId: string, @Body() data: CreateEventDto) {
    const owner = await this.userService.findOnyById(ownerId);
    const event = this.eventRepo.create({
      name: data.name,
      description: data.description,
      startAt: new Date(data.startAt),
      endAt: new Date(data.endAt),
      owner,
    });
    try {
      await this.eventRepo.save(event);
      await this.join(event.id, owner.id, true);
      return event;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('Error creating event.');
    }
  }

  async join(eventId: string, userId: string, isOwner = false) {
    const user = await this.userService.findOnyById(userId);
    const event = await this.findOneById(eventId);

    if (!isOwner && event.owner.id === user.id)
      throw new BadRequestException('Owner cannot join event.');

    const eventMember = await this.eventMemberRepo.create({
      event,
      user,
      isOwner,
    });
    await this.eventMemberRepo.save(eventMember);
  }

  async getMembers(eventId: string) {
    const eventMembers = await this.eventMemberRepo.find({
      where: {
        event: {
          id: eventId,
        },
      },
    });
    return eventMembers.map((eventMember) => ({
      ...eventMember.user,
      isOwner: eventMember.isOwner,
    }));
  }

  async getById(id: string) {
    try {
      const [event, memberCount] = await Promise.all([
        this.eventRepo.findOneOrFail({
          where: {
            id,
          },
        }),
        this.eventMemberRepo.count({
          where: {
            event: {
              id,
            },
          },
        }),
      ]);
      return {
        ...event,
        memberCount,
      };
    } catch (e) {
      throw new NotFoundException('Event not found.');
    }
  }

  async getUsersEvents(id: string) {
    const events = await this.eventMemberRepo.find({
      where: {
        user: {
          id,
        },
      },
    });

    return events.map((e) => e.event);
  }
}
