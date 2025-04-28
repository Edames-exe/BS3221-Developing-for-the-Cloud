import { IsOptional, IsString } from 'class-validator';


export class LoginReqDTO {
  @IsString()
  @IsOptional()
  username: string;

  password: string;
  // @IsString()
  // role: string;
}
