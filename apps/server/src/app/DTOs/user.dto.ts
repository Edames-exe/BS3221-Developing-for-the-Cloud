// apps/server/src/app/DTOs/user.dto.ts
import { IsString, MinLength, IsBoolean, IsOptional } from 'class-validator';

export class UserDto {
  @IsString() staffNum: string;
  @IsString() username: string;
  @IsString() @MinLength(6) password: string;

  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;

  // optional, defaults to false if omitted
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
