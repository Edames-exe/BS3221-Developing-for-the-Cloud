// apps/server/src/app/entities/location_record.entity.ts

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

  @Column()
  staffNum: string;

  @ManyToOne(() => User, user => user.records)
  @JoinColumn({ name: 'staffNum', referencedColumnName: 'staffNum' })
  user: User;

  @ManyToOne(() => Location, loc => loc.records)
  @JoinColumn({ name: 'locationId' })
  location: Location;

  @Column({
    type: 'datetime',
    name: 'startTime',
    default: () => 'CURRENT_TIMESTAMP',  // ← database will auto-stamp on insert
  })
  startTime: Date;

  @Column({ type: 'datetime', name: 'endTime', nullable: true })
  endTime?: Date | null;
}
