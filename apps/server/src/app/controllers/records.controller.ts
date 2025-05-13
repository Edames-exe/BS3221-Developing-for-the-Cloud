import { Controller, Post, Body, Get, Query, Patch, Param, Delete } from '@nestjs/common';
import { LocationRecordsService } from '../services/location-records.service';
import { CreateLocationRecordDto } from '../DTOs/createLocationRecord.dto';
import { UpdateLocationRecordDto } from '../DTOs/updateLocationRecord.dto';
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

  @Get()
  async getRecords(
    @Query('staffNum') staffNum: string,
  ): Promise<LocationRecord[]> {
    return this.recordsService.findByStaffNum(staffNum);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateLocationRecordDto,
  ): Promise<LocationRecord> {
    return this.recordsService.update(+id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.recordsService.remove(+id);
  }
}
