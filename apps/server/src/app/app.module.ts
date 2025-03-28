// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
//
// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AppService } from './app.service';
import { RecordsController } from './controllers/records.controller';


@Module({
  imports: [],
  controllers: [AuthController, RecordsController],
  providers: [AppService],
})
export class AppModule {}

