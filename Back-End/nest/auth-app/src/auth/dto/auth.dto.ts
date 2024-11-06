// src/noter/dto/create-noter.dto.ts
import { IsString, IsEmail } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  password: string
}
