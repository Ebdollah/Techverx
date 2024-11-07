import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true})
    username: String

    @Column({unique: true})
    email: String

    @Column()
    password: String
}