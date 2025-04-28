// src/auth/auth.controller.ts
import { Controller, Headers, HttpException, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(
    @Headers('username') username: string,
    @Headers('password') password: string
  ): any {
    // Temporary hard‑coded check
    if (username === 'james' && password === 'james') {
      return { username, role: 'admin', token: 'fake-jwt-token' };
    }
    throw new HttpException('Invalid credentials', 401);
  }
}
