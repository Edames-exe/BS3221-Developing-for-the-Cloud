import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationsRepo: Repository<Location>,
  ) {}

  async findAll(): Promise<Location[]> {
    return this.locationsRepo.find({ order: { name: 'ASC' } });
  }
}
