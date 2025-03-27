import { Body, Controller, Headers, Post } from '@nestjs/common';
import { RecordDTO } from '../DTOs/record.dto';

@Controller('records')
export class RecordsController {
  @Post('newRecord')
  newRecord(@Body() body: RecordDTO, @Headers() headers: any): string {
    return headers
  }
}
