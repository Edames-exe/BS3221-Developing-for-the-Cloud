import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth.module';
import { UsersModule } from './modules/users.module';
import { LocationsModule } from './modules/locations.module';
import { User } from './entities/user.entity';
import { Location } from './entities/location.entity';
import { RecordsController } from './controllers/records.controller';
import { AppService } from './app.service';
import { LocationRecord } from './entities/location_record.entity';
import { RecordsModule } from './modules/records.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'warden_user',
      password: process.env.DB_PASS || 'YourUser!Passw0rd',
      database: process.env.DB_NAME || 'firewarden_db',
      entities: [User, Location, LocationRecord],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    LocationsModule,
    RecordsModule,
  ],
  controllers: [RecordsController],
  providers: [AppService],
})
export class AppModule {}
