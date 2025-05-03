import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../DTOs/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(createDto: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(createDto.password, 10);
    const user = this.usersRepo.create({
      username: createDto.username,
      password: hash,
    });
    return this.usersRepo.save(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepo.findOne({ where: { username } });
  }
}
