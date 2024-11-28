import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class QueryServiceLocationDto {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Page number for pagination', example: 1 })
  page?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Number of items per page', example: 10 })
  limit?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Search by customer name', example: 'John Doe' })
  customer_name?: string;
}
