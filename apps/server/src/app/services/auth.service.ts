//apps/server/src/app/services/auth.service.ts
import { Injectable, UnauthorizedException, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { LoginDto } from '../DTOs/login.dto';
import { RegisterDto } from '../DTOs/register.dto';
import { UserDto } from '../DTOs/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const createDto: UserDto = {
      staffNum: dto.staffNum,
      username: dto.username,
      password: dto.password,
      active: false, // new users start inactive
    };

    const user = await this.usersService.create(createDto);

    const tokenPayload = {
      username: user.username,
      sub: user.staffNum,
      isAdmin: user.isAdmin,
    };

    return { access_token: this.jwtService.sign(tokenPayload) };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.username, dto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (!user.active) {
      // Reject inactive users
      throw new HttpException('User is not active', 403);
    }

    const tokenPayload = {
      username: user.username,
      sub: user.staffNum,
      isAdmin: user.isAdmin,
    };

    return { access_token: this.jwtService.sign(tokenPayload) };
  }
}
