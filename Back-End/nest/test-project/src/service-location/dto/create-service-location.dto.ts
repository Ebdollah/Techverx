import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, IsNumber } from 'class-validator';

export class CreateServiceLocationDto {
  @IsUUID()
  @ApiProperty({ description: 'Customer ID' })
  customer_id: string;

  @IsString()
  @ApiProperty({ description: 'Customer Name' })
  customer_name: string;

  @IsString()
  @ApiProperty({ description: 'Address' })
  address: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Benchmark price', required: false })
  benchmark_price?: number;

  @IsString()
  @ApiProperty({ description: 'External UID' })
  external_uid: string;

  @IsString()
  @ApiProperty({ description: 'Location ID' })
  location_id: string;

  @IsString()
  @ApiProperty({ description: 'Program' })
  program: string;

  @IsString()
  @ApiProperty({ description: 'Source' })
  source: string;
}
