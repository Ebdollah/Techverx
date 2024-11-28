import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional, IsISO8601, IsNumber } from 'class-validator';

export class CreateHaulerBillDto {
  @IsUUID()
  @ApiProperty({ description: 'Customer ID' })
  customer_id: string;

  @IsString()
  @ApiProperty({ description: 'Customer Name' })
  customer_name: string;

  @IsUUID()
  @ApiProperty({ description: 'Hauler ID' })
  hauler_id: string;

  @IsString()
  @ApiProperty({ description: 'Hauler Name' })
  hauler_name: string;

  @IsUUID()
  @ApiProperty({ description: 'Regional Hauler ID' })
  regional_hauler_id: string;

  @IsString()
  @ApiProperty({ description: 'Regional Hauler Name' })
  regional_hauler_name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Document', required: false })
  document?: string;

  @IsISO8601()
  @ApiProperty({ description: 'Issue Date' })
  issue_date: string;

  @IsString()
  @ApiProperty({ description: 'Bill Number' })
  number: string;

  @IsNumber()
  @ApiProperty({ description: 'Total Amount' })
  total_amount: number;
}
