import { Body, Controller, Delete, Get, Logger, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { EventService } from './events.service';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsQueryService } from './events-query.service';
import { ListEvents } from './list.event';
import { SelectQueryBuilder } from 'typeorm';

@Controller('events') // This sets the base route for the controller
export class EventsController {
    private readonly logger = new Logger(EventsController.name);

    constructor(private readonly eventService: EventService, private eventQueryService:EventsQueryService) {
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
  async getEvents(@Query() filter:ListEvents): Promise<Event[] | SelectQueryBuilder<Event>> {
      this.logger.log('Fetching all events...');
      if(!filter){
          const events = await this.eventService.getEvents();
          this.logger.log(`Fetched ${events.length} events.`);
          return events;
      }
      else{
        const events = await this.eventQueryService.getEventsWithAttendeeCountFilteredQuery(filter)
        //   this.logger.log(`Fetched ${events.length} events.`);
        return events;
      }
     
  }

  @Get(':id')
  async getEventById(@Param('id') id: number): Promise<Event> {
      try {
          this.logger.log(`Fetching event with id ${id}...`);
          const event = await this.eventService.getEventById(id);
          this.logger.log(`Event with id ${id} fetched successfully.`);
          return event;
      } catch (error) {
          this.logger.error(`Error fetching event with id ${id}:`, error.message);
          throw error;
      }
  }

  @Get('query/:id')
  async getEventByQuery(@Param('id', ParseIntPipe) id: number) {
    // console.log(typeof id);
    const event = await this.eventQueryService.getEvent(id);

    if (!event) {
      throw new NotFoundException();
    }

    return event;
  }

  @Post()
  async createEvent(
      @Body() createEventDto: CreateEventDto
  ): Promise<{ id: number; message: string }> {
      try {
          this.logger.log('Creating a new event...');
          const result = await this.eventService.createEvent(createEventDto);
          this.logger.log('Event created successfully.');
          return result;
      } catch (error) {
          this.logger.error('Error creating event:', error.message);
          throw error;
      }
  }

  @Put(':id')
  async updateEvent(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto): Promise<{ data: Event, message: string }> {
      try {
          this.logger.log(`Updating event with id ${id}...`);
          const result = await this.eventService.updateEvent(id, updateEventDto);
          this.logger.log(`Event with id ${id} updated successfully.`);
          return result;
      } catch (error) {
          this.logger.error(`Error updating event with id ${id}:`, error.message);
          throw error;
      }
  }

  @Delete(':id')
  async deleteEvenet(@Param('id') id: number): Promise<{ id: number, message: string }> {
      try {
          this.logger.log(`Deleting event with id ${id}...`);
          const result = await this.eventService.deleteEvenet(id);
          this.logger.log(`Event with id ${id} deleted successfully.`);
          return result;
      } catch (error) {
          this.logger.error(`Error deleting event with id ${id}:`, error.message);
          throw error;
      }
  }
}
