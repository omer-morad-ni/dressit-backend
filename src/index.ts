import { $log, ServerLoader } from '@tsed/common';
import { Server } from './server';

async function bootstrap() {
  try {
    $log.debug('Start server...');
    const server = await ServerLoader.bootstrap(Server);

    await server.listen();
    $log.debug('Server initialized');
  } catch (e) {
    $log.error(e);
  }
}

bootstrap();
