import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth } from './auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepositery } from './user.repositery';


@Module({
  imports: [TypeOrmModule.forFeature([Auth])],
  controllers: [AuthController],
  providers: [AuthService, UsersRepositery]
})
export class AuthModule {}
