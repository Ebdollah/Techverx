import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Teacher } from './entities/teacher.entity';
import { TrainingController } from "./training.controller";
import { Student } from "./entities/student.entity";
import { TrainingService } from "./training.service";

@Module({
  imports: [TypeOrmModule.forFeature([Subject, Teacher, Student])],
  controllers: [TrainingController],
  providers:[TrainingService]
})
export class SchoolModule { }