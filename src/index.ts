import { $log, ServerLoader } from '@tsed/common';
import { Server } from './server';

async function bootstrap() {
  try {
    const server = await ServerLoader.bootstrap(Server);

    await server.listen();
    $log.info('Application started successfully');
  } catch (e) {
    $log.error(e);
  }
}

bootstrap();
