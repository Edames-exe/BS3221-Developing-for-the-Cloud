import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationRecord } from '../entities/location_record.entity';
import { CreateLocationRecordDto } from '../DTOs/createLocationRecord.dto';
import { UpdateLocationRecordDto } from '../DTOs/updateLocationRecord.dto';

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

  async findByStaffNum(staffNum: string): Promise<LocationRecord[]> {
    return this.recordsRepo.find({
      where: { staffNum },
      relations: ['location'],
      order: { startTime: 'DESC' },
    });
  }

  async update(id: number, dto: UpdateLocationRecordDto): Promise<LocationRecord> {
    const record = await this.recordsRepo.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException(`Record with id ${id} not found`);
    }
    if (dto.endTime !== undefined) {
      record.endTime = new Date(dto.endTime);
    }
    return this.recordsRepo.save(record);
  }
}
