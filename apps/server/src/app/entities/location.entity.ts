import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { LocationRecord } from './location_record.entity';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => LocationRecord, record => record.location)
  records: LocationRecord[];
}
