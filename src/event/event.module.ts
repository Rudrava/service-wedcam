import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventRepo } from './entities/event.entity';

@Module({
  imports: [EventRepo],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventRepo],
})
export class EventModule {}
