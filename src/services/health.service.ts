import { Injectable } from '@tsed/di';
import { AfterRoutesInit } from '@tsed/common';
import { Connection } from 'typeorm';
import { TypeORMService } from '@tsed/typeorm';

@Injectable()
export class HealthService implements AfterRoutesInit {
  private connection: Connection;

  constructor(private readonly typeORMService: TypeORMService) {}

  public $afterRoutesInit() {
    this.connection = this.typeORMService.get('default')!;
  }

  public async healthcheck(): Promise<any> {
    const result = await this.connection.manager.query('SELECT 1 AS health');

    return result[0];
  }
}
