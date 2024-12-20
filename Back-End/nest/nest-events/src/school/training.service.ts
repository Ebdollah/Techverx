// training.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { Teacher } from './entities/teacher.entity';
import { Student } from "./entities/student.entity";

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentRepositery: Repository<Student>,
  ) { }

//   public async savingRelation(): Promise<any> {
//     const subject = await this.subjectRepository.findOne(3);
//     const teacher1 = await this.teacherRepository.findOne(5);
//     const teacher2 = await this.teacherRepository.findOne(6);

//     return await this.subjectRepository
//       .createQueryBuilder()
//       .relation(Subject, 'teachers')
//       .of(subject)
//       .add([teacher1, teacher2]);
//   }

//   public async removingRelation(): Promise<void> {
//     await this.subjectRepository.createQueryBuilder('s')
//       .update()
//       .set({ name: "Confidential" })
//       .execute();
//   }
}
