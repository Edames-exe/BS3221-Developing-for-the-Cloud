import { IsString } from 'class-validator';

export class RecordDTO {
  @IsString()
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  surname: string;

  @IsString()
  location: string;

  @IsString()
  startTime: number;

  @IsString()
  endTime: number;
}
