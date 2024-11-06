import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Authent{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: String

    @Column()
    email: String

    @Column()
    password: String
}