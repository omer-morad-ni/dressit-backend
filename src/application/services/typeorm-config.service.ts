import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { Environment } from '../utils/env.enum';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  public constructor(private readonly config: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const config: MysqlConnectionOptions = {
      type: 'mysql',
      host: this.config.get('db.host'),
      port: this.config.get('db.port'),
      username: this.config.get('db.username'),
      password: this.config.get('db.password'),
      database: this.config.get('db.name'),
      entities: [path.join(__dirname, '..', '..', '..', '**/*.entity.js')],
      synchronize: true,
    };

    /* eslint-disable */
    if (process.env.NODE_ENV === Environment.PROD) {
      // @ts-ignore
      return {
        ...config,
        ssl: {
          ca: this.config.get('db.ssl_ca'),
        },
      };
    }

    // @ts-ignore
    return config;
  }
}
