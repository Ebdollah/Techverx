import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./student.entity";
import { Teacher } from "./teacher.entity";

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ length: 20, unique: true })
  code: string;

  @ManyToMany(() => Student, (student) => student.subjects, { cascade: true })
  @JoinTable({
    name: 'student_subjects', // custom join table name, optional
    joinColumn: {
      name: 'subjectId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'studentId',
      referencedColumnName: 'id',
    },
  })
  students: Student[];

  @ManyToMany(() => Teacher, (teacher) => teacher.subjects, { cascade: true })
  @JoinTable({
    name: 'teacher_subjects', // custom join table name, optional
    joinColumn: {
      name: 'subjectId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'teacherId',
      referencedColumnName: 'id',
    },
  })
  teachers: Teacher[];
}