import { Module } from '@nestjs/common';
import { NoterController } from './noter.controller';
import { NoterService } from './noter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Noter } from './noter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Noter])],
  controllers: [NoterController],
  providers: [NoterService]
})
export class NoterModule {}
