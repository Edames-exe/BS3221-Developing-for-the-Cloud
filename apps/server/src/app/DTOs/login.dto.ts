// apps/server/src/app/DTOs/login.dto.ts
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
