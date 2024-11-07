import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    username: String

    @Column()
    email: String

    @Column()
    password: String
}