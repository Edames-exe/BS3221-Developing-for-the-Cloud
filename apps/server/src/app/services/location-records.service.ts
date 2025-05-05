import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationRecord } from '../entities/location_record.entity';
import { CreateLocationRecordDto } from '../DTOs/createLocationRecord.dto';

@Injectable()
export class LocationRecordsService {
  constructor(
    @InjectRepository(LocationRecord)
    private recordsRepo: Repository<LocationRecord>,
  ) {}

  async create(dto: CreateLocationRecordDto): Promise<LocationRecord> {
    const record = this.recordsRepo.create({
      staffNum: dto.staffNum,
      locationId: dto.locationId,
      startTime: new Date(dto.startTime),
      endTime: dto.endTime ? new Date(dto.endTime) : null,
    });
    return this.recordsRepo.save(record);
  }
}
