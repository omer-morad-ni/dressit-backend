import { HealthCheckResult, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  constructor(private health: HealthCheckService, private db: TypeOrmHealthIndicator) {}

  public healthcheck(): Promise<HealthCheckResult> {
    return this.health.check([() => this.db.pingCheck('database')]);
  }
}
