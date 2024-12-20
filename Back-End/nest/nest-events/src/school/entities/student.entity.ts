import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Subject } from "./subject.entity";


@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @ManyToMany(() => Subject, subject => subject.students)
  subjects: Subject[];
}
