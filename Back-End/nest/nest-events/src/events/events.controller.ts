import { Controller, Get, Logger, NotFoundException } from '@nestjs/common';
import { EventService } from './events.service';
import { Event } from './event.entity';

@Controller('events') // This sets the base route for the controller
export class EventsController {
    private readonly logger = new Logger(EventsController.name);

    constructor(private readonly eventService: EventService) {
        this.logger.log('EventsController initialized.');
    }

    @Get()
    async getEvents(): Promise<Event[]> {
        this.logger.log('Fetching all events...');
        const events = await this.eventService.getEvents();
        if(!events){
            throw new NotFoundException();
        }
        this.logger.log(`Fetched ${events.length} events.`);
        return events;
    }
}
