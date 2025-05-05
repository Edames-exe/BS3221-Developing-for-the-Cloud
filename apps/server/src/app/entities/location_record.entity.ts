import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Location } from './location.entity';

@Entity('location_records')
export class LocationRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'staffNum', type: 'varchar', length: 50 })
  staffNum: string;

  @ManyToOne(() => User, user => user.records, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'staffNum' })
  user: User;

  @Column({ name: 'location_id', type: 'int' })
  locationId: number;

  @ManyToOne(() => Location, loc => loc.records, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @Column({ name: 'start_time', type: 'datetime' })
  startTime: Date;

  @Column({ name: 'end_time', type: 'datetime', nullable: true })
  endTime?: Date;
}
