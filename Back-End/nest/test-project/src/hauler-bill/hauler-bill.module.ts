import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HaulerBillController } from './hauler-bill.controller';
import { HaulerBillService } from './hauler-bill.service';
import { HaulerBill } from './hauler-bill.entity';
import { ServiceLocation } from '../service-location/service-location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HaulerBill, ServiceLocation])],
  controllers: [HaulerBillController],
  providers: [HaulerBillService],
})
export class HaulerBillModule {}
