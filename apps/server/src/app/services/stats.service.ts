// apps/server/src/app/services/stats.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationRecord } from '../entities/location_record.entity';
import { Location } from '../entities/location.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(LocationRecord)
    private recordsRepo: Repository<LocationRecord>,
    @InjectRepository(Location)
    private locationsRepo: Repository<Location>,
  ) {}

  async getStats() {
    // 1) load only open records, including their `location` relation
    const openRecords = await this.recordsRepo.find({
      where: { endTime: null },
      relations: ['location'],
    });

    // 2) count unique wardens
    const activeWardens = new Set(openRecords.map(r => r.staffNum)).size;

    // 3) count unique locations covered
    const coveredLocationIds = new Set(openRecords.map(r => r.location.id));
    const areasCovered = coveredLocationIds.size;

    // 4) total locations (for coverage %)
    const totalLocations = await this.locationsRepo.count();

    const coveragePercent =
      totalLocations > 0
        ? Math.round((areasCovered / totalLocations) * 100)
        : 0;

    return { activeWardens, areasCovered, coveragePercent };
  }
}
