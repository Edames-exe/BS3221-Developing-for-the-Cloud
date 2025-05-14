import { Controller, Get } from '@nestjs/common';
import { StatsService } from '../services/stats.service';
import { ActiveWardenDto } from '../DTOs/activeWarden.dto';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('active-wardens')
  getActiveWardens(): Promise<ActiveWardenDto[]> {
    return this.statsService.getActiveWardens();
  }
}
