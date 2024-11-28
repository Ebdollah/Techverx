import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HaulerBillModule } from './hauler-bill/hauler-bill.module';
import { ServiceLocationModule } from './service-location/service-location.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Auto-discover all entities
      synchronize: true, // Set to false in production
    }),
    HaulerBillModule,
    ServiceLocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
