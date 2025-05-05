import { Controller, Get } from '@nestjs/common';
import { LocationsService } from '../services/locations.service';
import { Location } from '../entities/location.entity';

@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Get()
  async getAll(): Promise<Location[]> {
    return this.locationsService.findAll();
  }
}
