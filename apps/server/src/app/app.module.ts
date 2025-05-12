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
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as fs from 'node:fs';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),        // ← loads .env into process.env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'mysql',
        host: cfg.get('DB_HOST'),
        port: +cfg.get('DB_PORT'),
        username: cfg.get('DB_USER'),
        password: cfg.get('DB_PASS'),
        database: cfg.get('DB_NAME'),
        entities: [User, Location, LocationRecord],
        synchronize: true,
        ssl: {
          ca: fs.readFileSync(
            cfg.get<string>('MYSQL_SSL_CA_PATH') //1
          ),
        },
      }),
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
