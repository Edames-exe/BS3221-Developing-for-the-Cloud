import { IsOptional, IsString } from 'class-validator';


export class LoginDto {
  @IsString()
  @IsOptional()
  username: string;

  password: string;
  // @IsString()
  // role: string;
}
