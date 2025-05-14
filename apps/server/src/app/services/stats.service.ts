// apps/server/src/app/services/stats.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationRecord } from '../entities/location_record.entity';
import { ActiveWardenDto } from '../DTOs/activeWarden.dto';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(LocationRecord)
    private readonly recordsRepo: Repository<LocationRecord>,
  ) {}

  async getActiveWardens(): Promise<ActiveWardenDto[]> {
    // Use QueryBuilder to ensure endTime IS NULL
    const openRecords = await this.recordsRepo
      .createQueryBuilder('record')
      .leftJoinAndSelect('record.user', 'user')
      .leftJoinAndSelect('record.location', 'location')
      .where('record.endTime IS NULL')
      .orderBy('record.startTime', 'ASC')
      .getMany();

    return openRecords.map(r => ({
      staffNum:  r.staffNum,
      username:  r.user.username,
      location:  r.location.name,
      startTime: r.startTime,
    }));
  }
}
