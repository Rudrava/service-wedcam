import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { EventRepo } from './entities/event.entity';
import { EventMemberRepo } from './entities/event_member.entity';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [EventRepo, EventMemberRepo, UserModule],
  controllers: [EventController],
  providers: [EventService, UserService],
  exports: [EventRepo, EventMemberRepo, EventService],
})
export class EventModule {}
