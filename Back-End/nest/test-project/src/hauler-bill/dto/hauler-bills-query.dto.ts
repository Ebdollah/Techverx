import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, IsBoolean, IsUUID } from 'class-validator';

export class HaulerBillsQueryDto {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Page number for pagination', example: 1 })
  page?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Number of items per page for pagination', example: 10 })
  limit?: number;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ description: 'Filter by active status', example: true })
  is_active?: boolean;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Filter by customer name', example: 'John Doe' })
  name?: string;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({ description: 'Filter by customer ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  customer_id?: string;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({ description: 'Filter by hauler ID', example: '123e4567-e89b-12d3-a456-426614174001' })
  hauler_id?: string;
}
