import { IsString, IsInt, IsDateString, IsOptional } from 'class-validator';

export class CreateLocationRecordDto {
  @IsString()
  staffNum: string;

  @IsInt()
  locationId: number;

  @IsDateString()
  startTime: string;  // ISO datetime string

  @IsDateString()
  @IsOptional()
  endTime?: string;
}
