import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
import { Event } from './events/event.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Database host
      port: 5432,        // Default PostgreSQL port
      username: 'postgres', // Username you created
      password: 'example', // Password you set
      database: 'nest-events', // Database name
      entities: [Event],
      autoLoadEntities: true, // Automatically load entity files
      synchronize: true, // Use only in development
    }),
    
    EventsModule,    
    // AuthModule,
    // UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
