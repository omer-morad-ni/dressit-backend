import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import database from './config/database.config';
import { UsersModule } from '../users/users.module';
import { TypeOrmConfigService } from './services/typeorm-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join(__dirname, '..', '..', `env/.env.${process.env.NODE_ENV}`),
      isGlobal: true,
      load: [database],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
  ],
})
export class AppModule {}
