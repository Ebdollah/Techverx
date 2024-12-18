import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Event]),
  ],
  controllers: [EventsController],
  providers: [EventService]
})
export class EventsModule {}
