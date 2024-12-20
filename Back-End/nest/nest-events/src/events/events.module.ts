import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Attendee } from './attendee.entity';
import { EventsQueryService } from './events-query.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Event, Attendee]),
  ],
  controllers: [EventsController],
  providers: [EventService, EventsQueryService]
})
export class EventsModule {}
