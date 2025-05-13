// apps/server/src/app/DTOs/updateLocationRecord.dto.ts
import { IsOptional, IsInt, Min, IsISO8601 } from 'class-validator';

export class UpdateLocationRecordDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  locationId?: number;

  @IsOptional()
  @IsISO8601()
  endTime?: string;
}
