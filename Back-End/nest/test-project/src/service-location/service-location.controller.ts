import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ServiceLocation } from './service-location.entity';
import { ServiceLocationsService } from './service-location.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryServiceLocationDto } from './dto/query-service-location.dto';
import { CreateServiceLocationDto } from './dto/create-service-location.dto';

@ApiTags('Service Locations')
@Controller('api/v1/accounts/:account_id/hauler_bills/:hauler_bill_id/service-locations')
export class ServiceLocationsController {
  constructor(private readonly serviceLocationsService: ServiceLocationsService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all service locations for a hauler bill' })
  @Get()
  async findAll(
    @Param('account_id') accountId: string,
    @Param('hauler_bill_id') haulerBillId: string,
    @Query() query: QueryServiceLocationDto,
  ): Promise<ServiceLocation[]> {
    return this.serviceLocationsService.findAll(accountId, haulerBillId, query);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new service location for a hauler bill' })
  @Post()
  async create(
    @Param('account_id') accountId: string,
    @Param('hauler_bill_id') haulerBillId: string,
    @Body() serviceLocationData: CreateServiceLocationDto,
  ): Promise<ServiceLocation> {
    return this.serviceLocationsService.create(accountId, serviceLocationData, haulerBillId);
  }
}
