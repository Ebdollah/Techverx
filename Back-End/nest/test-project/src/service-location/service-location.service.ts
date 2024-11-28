import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceLocation } from './service-location.entity';
import { QueryServiceLocationDto } from './dto/query-service-location.dto';

@Injectable()
export class ServiceLocationsService {
  constructor(
    @InjectRepository(ServiceLocation)
    private readonly serviceLocationRepository: Repository<ServiceLocation>,
  ) {}

  async findAll(accountId: string, haulerBillId: string, query: QueryServiceLocationDto): Promise<ServiceLocation[]> {
    const where: any = { account_id: accountId, hauler_bill_id: haulerBillId, ...query };

    return this.serviceLocationRepository.find({
      where,
      skip: query.page ? (query.page - 1) * query.limit : undefined,
      take: query.limit,
    });
  }

  async create(
    accountId: string,
    serviceLocationData: Partial<ServiceLocation>,
    haulerBillId: string,
  ): Promise<ServiceLocation> {
    return this.serviceLocationRepository.save({
      ...serviceLocationData,
      account_id: accountId,
      hauler_bill_id: haulerBillId,
    });
  }
}
