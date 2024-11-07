// src/noter/dto/create-noter.dto.ts
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string
}
