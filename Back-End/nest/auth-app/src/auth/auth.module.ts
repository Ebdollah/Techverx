import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth } from './auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepositery } from './user.repositery';
import { PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'string',
      global: true,
      signOptions: { expiresIn: '1800s' },
    }),
    TypeOrmModule.forFeature([Auth])],
  controllers: [AuthController],
  providers: [AuthService, UsersRepositery, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
