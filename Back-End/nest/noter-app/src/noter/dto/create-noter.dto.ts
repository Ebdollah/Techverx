// src/noter/dto/create-noter.dto.ts
import { IsString } from 'class-validator';

export class CreateNoterDto {
  @IsString()
  noter: string;
}
