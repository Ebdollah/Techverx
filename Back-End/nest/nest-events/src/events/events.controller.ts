import { Body, Controller, Delete, Get, Logger, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { EventService } from './events.service';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events') // This sets the base route for the controller
export class EventsController {
    private readonly logger = new Logger(EventsController.name);

    constructor(private readonly eventService: EventService) {
        this.logger.log('EventsController initialized.');
    }

    @Get('practice2')
    async practice2() {
    // return await this.repository.findOne(
    //   1,
    //   { relations: ['attendees'] }
    // );
    const event = await this.eventService.practice2(1);
    // const event = new Event();
    // event.id = 1;

    
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

    @Get(':id')
    async getEventById(@Param('id') id:number):Promise<Event>{
        return this.eventService.getEventById(id);
    }

    @Post()
    async createEvent(
    @Body() createEventDto: CreateEventDto
    ): Promise<{ id: number; message: string }> {
    // Call the service method and return its result directly
    return await this.eventService.createEvent(createEventDto);
    // return { id, message };
    }
    
    @Put(':id')
    async updateEvent(@Param('id') id:number, @Body() updateEventDto:UpdateEventDto):Promise<{data:Event, message: string }>{
        return await this.eventService.updateEvent(id, updateEventDto);
    }

    @Delete(':id')
    async deleteEvenet(@Param('id') id:number):Promise<{id:number, message: string }>{
        return await this.eventService.deleteEvenet(id);
    }
}
