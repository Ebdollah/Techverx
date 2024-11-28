import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceLocationsService } from './service-location.service';
import { ServiceLocationsController } from './service-location.controller';
import { ServiceLocation } from './service-location.entity';
import { HaulerBill } from '../hauler-bill/hauler-bill.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceLocation, HaulerBill]), // Register entities
  ],
  providers: [ServiceLocationsService],
  controllers: [ServiceLocationsController],
  exports: [ServiceLocationsService], // Export service for use in other modules if needed
})
export class ServiceLocationModule {}
