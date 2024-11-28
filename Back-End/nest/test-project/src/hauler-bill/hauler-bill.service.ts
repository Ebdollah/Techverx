import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HaulerBill } from './hauler-bill.entity';
import { ServiceLocation } from '../service-location/service-location.entity';
import { HaulerBillsQueryDto } from './dto/hauler-bills-query.dto';
import { CreateHaulerBillDto } from './dto/create-hualer-bills.dto';

@Injectable()
export class HaulerBillService {
  constructor(
    @InjectRepository(HaulerBill)
    private readonly haulerBillRepository: Repository<HaulerBill>,

    @InjectRepository(ServiceLocation)
    private readonly serviceLocationRepository: Repository<ServiceLocation>,
  ) {}

  async findAll(
    accountId: string,
    filters: HaulerBillsQueryDto,
  ): Promise<{ data: HaulerBill[]; meta: { total: number; page: number; limit: number } }> {
    const { page = 1, limit = 10, ...where } = filters;
    const [result, total] = await this.haulerBillRepository.findAndCount({
      where: { account_id: accountId, ...where },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: result,
      meta: {
        total,
        page,
        limit,
      },
    };
  }

  async create(accountId: string, haulerBillData: CreateHaulerBillDto): Promise<HaulerBill> {
    return this.haulerBillRepository.save({ ...haulerBillData, account_id: accountId });
  }
}
