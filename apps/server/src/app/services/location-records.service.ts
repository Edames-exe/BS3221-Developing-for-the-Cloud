// apps/server/src/app/services/location-records.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationRecord } from '../entities/location_record.entity';
import { CreateLocationRecordDto } from '../DTOs/createLocationRecord.dto';
import { Location } from '../entities/location.entity';
import { UpdateLocationRecordDto } from '../DTOs/updateLocationRecord.dto';

@Injectable()
export class LocationRecordsService {
  constructor(
    @InjectRepository(LocationRecord)
    private recordsRepo: Repository<LocationRecord>,
  ) {
  }

  async create(dto: CreateLocationRecordDto): Promise<LocationRecord> {
    // stamp startTime right here
    const now = new Date();

    const record = this.recordsRepo.create({
      staffNum: dto.staffNum,
      location: { id: dto.locationId } as Location,
      startTime: now,
      endTime: null,          // always start null
    });

    return this.recordsRepo.save(record);
  }

  async findByStaffNum(staffNum: string): Promise<LocationRecord[]> {
    return this.recordsRepo.find({
      where: { staffNum },
      relations: ['location'],
      order: { startTime: 'DESC' },
    });
  }

  async endRecord(id: number): Promise<LocationRecord> {
    await this.recordsRepo.update(id, { endTime: new Date() });
    return this.recordsRepo.findOneOrFail({ where: { id }, relations: ['location'] });
  }

  async update(id: number, dto: UpdateLocationRecordDto): Promise<LocationRecord> {
    // Use TypeORM update for a quick write
    await this.recordsRepo.update(id, {
      endTime: dto.endTime ? new Date(dto.endTime) : null,
    });
    // Then load and return the updated entity
    return this.recordsRepo.findOneOrFail({
      where: { id },
      relations: ['location'],
    });
  }
}
