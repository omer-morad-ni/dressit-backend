import { Controller, Get } from '@tsed/common';
import { HealthService } from '../services/health.service';

@Controller('/healthcheck')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Get('/')
  public async healthcheck(): Promise<any> {
    const status = await this.healthService.healthcheck();

    return {
      status: status.health,
    };
  }
}
