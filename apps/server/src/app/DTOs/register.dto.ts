// apps/server/src/app/DTOs/register.dto.ts
import { IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  staffNum: string;

  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}
