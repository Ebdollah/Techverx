import { Controller, Get } from '@nestjs/common';
import { EventService } from './events.service';
import { Event } from './event.entity';

@Controller('events') // This sets the base route for the controller
export class EventsController {
    constructor(private eventService: EventService) {}

    @Get()
    async getEvents(): Promise<Event[]> {
        console.log('Fetching events...');
        return this.eventService.getEvents();
    }
}
