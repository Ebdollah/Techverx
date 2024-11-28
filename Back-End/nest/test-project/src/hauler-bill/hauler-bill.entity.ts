import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ServiceLocation } from '../service-location/service-location.entity';

@Entity('hauler_bills')
export class HaulerBill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty({ description: 'Account ID' })
  account_id: string;

  @Column()
  @ApiProperty({ description: 'Customer ID' })
  customer_id: string;

  @Column()
  @ApiProperty({ description: 'Customer Name' })
  customer_name: string;

  @Column()
  @ApiProperty({ description: 'Hauler ID' })
  hauler_id: string;

  @Column()
  @ApiProperty({ description: 'Hauler Name' })
  hauler_name: string;

  @Column()
  @ApiProperty({ description: 'Regional Hauler ID' })
  regional_hauler_id: string;

  @Column()
  @ApiProperty({ description: 'Regional Hauler Name' })
  regional_hauler_name: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: 'Document content', required: false })
  document: string;

  @Column({ type: 'date' })
  @ApiProperty({ description: 'Issue Date' })
  issue_date: Date;

  @Column()
  @ApiProperty({ description: 'Bill Number' })
  number: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty({ description: 'Total Amount' })
  total_amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ServiceLocation, (serviceLocation) => serviceLocation.haulerBill)
  serviceLocations: ServiceLocation[];
}
