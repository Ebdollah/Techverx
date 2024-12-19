import { BadRequestException, Injectable } from '@nestjs/common';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendee } from './attendee.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private eventRepositery:Repository<Event>,
        @InjectRepository(Attendee)
    private readonly attendeeRepository: Repository<Attendee>
    ){}

    async practice2(id:number) {
    // return await this.repository.findOne(
    //   1,
    //   { relations: ['attendees'] }
    // );
    const event = await this.eventRepositery.findOne(
      {where:{id:1},  relations: ['attendees']},
    );
    // const event = new Event();
    // event.id = 1;

    const attendee = new Attendee();
    attendee.name = 'Using cascade';
    // attendee.event = event;

    event.attendees.push(attendee);
    // event.attendees = [];

    // await this.attendeeRepository.save(attendee);
    await this.eventRepositery.save(event);

    return event;
  }

    async getEvents():Promise<Event[]>{
        return this.eventRepositery.find();
    }

    async getEventById(id: number):Promise<Event>{
       return this.eventRepositery.findOne({where:{id},relations:['attendees']})
    }

    async createEvent(createEventDto: CreateEventDto): Promise<{ id: number, message: string }> {
      try {
        const newEvent = this.eventRepositery.create(createEventDto);
        await this.eventRepositery.save(newEvent);
    
        return {
          id: newEvent.id,
          message: 'Event created successfully!',
        };
      } catch (error) {
        console.error('Error creating event:', error);
    
        throw new BadRequestException(
          error?.detail || 'Invalid input data or event creation failed.'
        );
      }
    }

    async updateEvent(id:number, updateEventDto:UpdateEventDto):Promise<{data:Event, message:string}>{
      try{
        const event = await this.eventRepositery.findOne({where:{id}})
        if (!event) {
          throw new Error('Event not found');
        }
        const updatedData =  this.eventRepositery.merge(event,updateEventDto)
        await this.eventRepositery.save(updatedData);
        return {
          data: updatedData,
          message:'Event updated successfully!',
        }
      }catch (error) {
        console.error('Error updating event:', error);
        throw new BadRequestException(
          error.message || 'Failed to update the event'
        );
      }
    }

    async deleteEvenet(id: number):Promise<{id:number, message: string }>{
      const event = await this.eventRepositery.findOne({where:{id}})
      await this.eventRepositery.delete(event)
      return{
        id:event.id,
        message:'Event Deleted Sucessfuly'
      }
    }
    
}
