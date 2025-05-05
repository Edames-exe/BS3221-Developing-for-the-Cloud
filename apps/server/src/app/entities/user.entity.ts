// apps/server/src/app/entities/user.entity.ts
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn({ name: 'StaffNum', type: 'varchar', length: 50 })
  staffNum: string;

  @Column({ name: 'Username',   type: 'varchar', length: 255, unique: true })
  username: string;

  @Column({ name: 'Password',   type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'isAdmin',    type: 'tinyint', width: 1, default: 0 })
  isAdmin: boolean;

  @Column({ name: 'Active',     type: 'tinyint', width: 1, default: 0 })
  active: boolean;
}
