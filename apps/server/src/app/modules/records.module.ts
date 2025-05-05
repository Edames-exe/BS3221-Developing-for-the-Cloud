import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationRecord } from '../entities/location_record.entity';
import { LocationRecordsService } from '../services/location-records.service';
import { RecordsController } from '../controllers/records.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LocationRecord])],
  providers: [LocationRecordsService],
  controllers: [RecordsController],
  exports: [LocationRecordsService],
})
export class RecordsModule {}
