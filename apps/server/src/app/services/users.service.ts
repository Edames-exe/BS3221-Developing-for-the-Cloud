import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { UserDto } from '../DTOs/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(dto: UserDto): Promise<User> {

    const hash = await bcrypt.hash(dto.password, 10);

    const user = this.usersRepo.create({
      staffNum: dto.staffNum,
      username: dto.username,
      password: hash,
      isAdmin: dto.isAdmin ?? false,
      active:  dto.active  ?? false,
    });

    return this.usersRepo.save(user);
  }

  /**
   * Lookup by username (for login):
   */
  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepo.findOne({ where: { username } });
  }

  /**
   * (Optional) If you need to find by staffNum elsewhere:
   */
  async findByStaffNum(staffNum: string): Promise<User | undefined> {
    return this.usersRepo.findOne({ where: { staffNum } });
  }
}
