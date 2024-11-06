import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


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
}