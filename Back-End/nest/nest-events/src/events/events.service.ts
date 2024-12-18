import { Injectable } from '@nestjs/common';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private eventRepositery:Repository<Event>
    ){}

    async getEvents():Promise<Event[]>{
        return this.eventRepositery.find();
    }
}
