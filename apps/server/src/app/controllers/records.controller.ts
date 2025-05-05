import { Controller, Post, Body } from '@nestjs/common';
import { LocationRecordsService } from '../services/location-records.service';
import { CreateLocationRecordDto } from '../DTOs/createLocationRecord.dto';
import { LocationRecord } from '../entities/location_record.entity';

@Controller('records')
export class RecordsController {
  constructor(private recordsService: LocationRecordsService) {}

  @Post()
  async createRecord(
    @Body() dto: CreateLocationRecordDto,
  ): Promise<LocationRecord> {
    return this.recordsService.create(dto);
  }
}
