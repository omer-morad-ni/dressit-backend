import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { HttpStatus, Logger } from '@nestjs/common';
import { AppModule } from './application/app.module';
import { HealthService } from './application/services/health.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const healthService = app.get(HealthService);

  const PORT = config.get('app.port') || 9000;

  app.setGlobalPrefix('api');

  app.getHttpAdapter().get('/healthcheck', async (req, res) => {
    try {
      const result = await healthService.healthcheck();
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.SERVICE_UNAVAILABLE).json(error.response);
    }
  });

  await app.listen(PORT);

  Logger.log(`Application is running on ${await app.getUrl()}`);
}

bootstrap();
