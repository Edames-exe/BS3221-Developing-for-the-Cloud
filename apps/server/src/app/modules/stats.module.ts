import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsController } from '../controllers/stats.controller';
import { StatsService }    from '../services/stats.service';
import { LocationRecord }  from '../entities/location_record.entity';
import { Location }        from '../entities/location.entity';
import { User }            from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocationRecord, Location, User]),
  ],
  controllers: [StatsController],
  providers:    [StatsService],
})
export class StatsModule {}
