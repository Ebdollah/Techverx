import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { Event } from './events/event.entity';
import ormConfig from './config/orm.config';
import { SchoolModule } from './school/school.module';
import { Attendee } from './events/attendee.entity';
import { Subject } from './school/entities/subject.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      // load:[ormConfig]
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Database host
      port: 5432,        // Default PostgreSQL port
      username: 'postgres', // Username you created
      password: 'example', // Password you set
      database: 'nest-events', // Database name
      entities: [Event,Attendee,Subject],
      autoLoadEntities: true, // Automatically load entity files
      synchronize: true, // Use only in development
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) =>
    //     configService.get<TypeOrmModuleOptions>('orm.config'), // Load the config
    // }),
    EventsModule,
    SchoolModule
  ],
})
export class AppModule {}
