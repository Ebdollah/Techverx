import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from "typeorm";
import { Event } from "./event.entity";
import { AttendeeAnswerEnum } from './attendee.entity';
import { ListEvents, WhenEventFilter } from './list.event';

@Injectable()
export class EventsQueryService {
  private readonly logger = new Logger(EventsQueryService.name);

  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>
  ) { }

  // Base query to be reused for all event queries
  private getEventsBaseQuery() {
    return this.eventsRepository
      .createQueryBuilder('e') // 'e' is an alias for the Event entity
      .orderBy('e.id', 'DESC'); // Order events by ID in descending order
  }

  // Builds a query to fetch events with related attendee counts
  public getEventsWithAttendeeCountQuery() {
    return this.getEventsBaseQuery()
      .loadRelationCountAndMap(
        'e.attendeeCount', 'e.attendees' // Counts total attendees
      )
      .loadRelationCountAndMap(
        'e.attendeeAccepted', // Maps to `attendeeAccepted` in the Event entity
        'e.attendees',        // Relation to count
        'attendee',           // Alias for the relation
        (qb) => qb.where('attendee.answer = :answer', { answer: AttendeeAnswerEnum.Accepted })
      )      
      .loadRelationCountAndMap(
        'e.attendeeMaybe',
        'e.attendees',
        'attendee',
        (qb) => qb.where('attendee.answer = :answer', { answer: AttendeeAnswerEnum.Maybe }) // Counts Maybe attendees
      )
      .loadRelationCountAndMap(
        'e.attendeeRejected',
        'e.attendees',
        'attendee',
        (qb) => qb.where('attendee.answer = :answer', { answer: AttendeeAnswerEnum.Rejected }) // Counts Rejected attendees
      );
  }

  public async getEventsWithAttendeeCountFilteredQuery(
    filter?: ListEvents
  ): Promise<SelectQueryBuilder<Event> | Event[]> {
    let query = this.getEventsWithAttendeeCountQuery();

    if (!filter) {
      return query;
    }

    if (filter.when) {
      if (filter.when == WhenEventFilter.Today) {
        // In Postgres
        query = query.andWhere(
          `e.when >= now() AND e.when <= now() + interval '1 day'`
        );
      }

      if (filter.when == WhenEventFilter.Tommorow) {
        // In Postgres
        query = query.andWhere(
          `e.when >= now() + interval '1 day' AND e.when <= now() + interval '2 day'`
        );
      }

      if (filter.when == WhenEventFilter.ThisWeek) {
        // In Postgres
        query = query.andWhere(`date_part('week', e.when) = date_part('week', now())`);
      }

      if (filter.when == WhenEventFilter.NextWeek) {
        // In Postgres
        query = query.andWhere(`date_part('week', e.when) = date_part('week', now()) + 1`);
      }
    }

    return await query;
  }

  // Fetch a specific event by ID, including attendee counts
  public async getEvent(id: number): Promise<Event | undefined> {
    const query = this.getEventsWithAttendeeCountQuery()
      .andWhere('e.id = :id', { id }); // Adds condition for the specific event ID

    this.logger.debug(query.getSql()); // Logs the generated SQL for debugging

    return await query.getOne(); // Executes the query and returns the result
  }
}