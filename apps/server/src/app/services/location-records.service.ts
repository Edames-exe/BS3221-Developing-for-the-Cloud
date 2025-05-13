import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationRecord } from '../entities/location_record.entity';
import { CreateLocationRecordDto } from '../DTOs/createLocationRecord.dto';
import { UpdateLocationRecordDto } from '../DTOs/updateLocationRecord.dto';
import { Location } from '../entities/location.entity';

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

  async update(
    id: number,
    dto: UpdateLocationRecordDto,
  ): Promise<LocationRecord> {
    // 1) find to ensure it exists
    const record = await this.recordsRepo.findOne({
      where: { id },
      relations: ['location'],
    });
    if (!record) {
      throw new NotFoundException(`Record with id ${id} not found`);
    }

    // 2) apply changes
    if (dto.locationId !== undefined) {
      // set the relation directly
      record.location = { id: dto.locationId } as Location;
      record.staffNum = record.staffNum; // keep staffNum unchanged
    }
    if (dto.endTime !== undefined) {
      record.endTime = dto.endTime ? new Date(dto.endTime) : null;
    }

    // 3) persist and return
    return this.recordsRepo.save(record);
  }

  async remove(id: number): Promise<void> {
    const result = await this.recordsRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Record with id ${id} not found`);
    }
  }
}
