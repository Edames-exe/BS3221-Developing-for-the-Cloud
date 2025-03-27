
import { Body, Controller, Get, Headers, HttpException, Post, Req } from '@nestjs/common';
import { LoginReqDTO } from '../DTOs/loginReq.dto';

@Controller('auth')
export class AuthController {
  @Get()
  getData(): string {
    return "Hi"
  }

  @Post('login')
  login(@Body() body: LoginReqDTO, @Headers() headers: any): string {
    if (body.role != 'admin') { throw new HttpException('Not allowed!', 401)}

    return headers

  }
}

//Post
