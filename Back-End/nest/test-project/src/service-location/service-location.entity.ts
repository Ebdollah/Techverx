import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { HaulerBill } from '../hauler-bill/hauler-bill.entity';

@Entity('service_locations')
export class ServiceLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  account_id: string;

  @Column()
  customer_id: string;

  @Column()
  customer_name: string;

  @Column()
  address: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  benchmark_price: number;

  @Column({ nullable: true })
  hauler_bill_id: string;

  @ManyToOne(() => HaulerBill, (haulerBill) => haulerBill.serviceLocations)
  @JoinColumn({ name: 'hauler_bill_id' })
  haulerBill: HaulerBill;
}
