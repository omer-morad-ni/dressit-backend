import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import database from './config/database.config';
import application from './config/application.config';
import { UsersModule } from '../users/users.module';
import { TypeOrmConfigService } from './services/typeorm-config.service';
import { HealthService } from './services/health.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join(__dirname, '..', '..', `env/.env.${process.env.NODE_ENV || 'development'}`),
      isGlobal: true,
      load: [database, application],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    TerminusModule,
  ],
  providers: [HealthService],
})
export class AppModule {}
