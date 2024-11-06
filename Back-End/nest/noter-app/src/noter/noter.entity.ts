import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Noter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  noter: string;
}
