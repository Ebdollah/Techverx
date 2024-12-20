import { Task } from "src/tasks/task.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";


@Entity()
export class Auth{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: String

    @Column()
    email: String

    @Column()
    password: String


    @OneToMany
    tasks: Task[]
}