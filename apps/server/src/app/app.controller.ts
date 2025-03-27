import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}

// @POST add submission - User, Location

// @GET getWardens

// @Get Submissions
// @update UpdateSubmission - user, role?, submissionID
