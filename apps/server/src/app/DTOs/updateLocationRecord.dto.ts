import { IsOptional, IsDateString } from 'class-validator';

export class UpdateLocationRecordDto {
  @IsDateString()
  @IsOptional()
  endTime?: string;
}
