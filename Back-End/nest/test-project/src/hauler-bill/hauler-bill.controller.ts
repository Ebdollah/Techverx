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
import { HaulerBillService } from './hauler-bill.service';
import { HaulerBill } from './hauler-bill.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateHaulerBillDto } from './dto/create-hualer-bills.dto';
import { HaulerBillsQueryDto } from './dto/hauler-bills-query.dto';
// import { CreateHaulerBillDto } from './dto/create-hauler-bill.dto';
import { GetHaulerBillsListSwagger, CreateHaulerBillSwagger } from './hauler-bills.swagger';

@ApiTags('Hauler Bills')
@Controller('api/v1/accounts/:accountId/hauler-bills')
export class HaulerBillController {
  constructor(private readonly haulerBillService: HaulerBillService) {}

  @HttpCode(HttpStatus.OK)
  @GetHaulerBillsListSwagger
  @Get()
  async findAll(
    @Param('accountId') accountId: string,
    @Query() filters: HaulerBillsQueryDto,
  ): Promise<{ data: HaulerBill[]; meta: { total: number; page: number; limit: number } }> {
    const page = filters.page || 1;
    const limit = Math.min(filters.limit || 10, 50);
    return this.haulerBillService.findAll(accountId, { ...filters, page, limit });
  }

  @HttpCode(HttpStatus.CREATED)
  @CreateHaulerBillSwagger
  @Post()
  async create(
    @Param('accountId') accountId: string,
    @Body() haulerBillData: CreateHaulerBillDto,
  ): Promise<HaulerBill> {
    return this.haulerBillService.create(accountId, haulerBillData);
  }
}
