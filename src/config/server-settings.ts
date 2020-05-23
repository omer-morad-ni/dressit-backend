import * as fs from 'fs';
import * as path from 'path';
import { Env } from '@tsed/core';
import { config as configEnv } from 'dotenv';
import loggerSettings from './logger';

const rootDir = path.join(__dirname, '..');
const { env } = process;
const { NODE_ENV = Env.DEV } = process.env;
configEnv({ path: path.join(rootDir, '..', `env/.env.${NODE_ENV}`) });

const serverSettings = {
  rootDir,
  httpPort: process.env.PORT || 9000,
  logger: loggerSettings,
  httpsPort: false,
  acceptMimes: ['application/json'],
  mount: {
    '/v1': [`${rootDir}/controllers/*.ts`],
  },
  componentsScan: [`${rootDir}/services/*.service.ts`, `${rootDir}/repositories/*.ts`, `${rootDir}/protocols/*.ts`],
  typeorm: [
    {
      // ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'root'
      name: 'default',
      type: 'mysql',
      host: env.DB_HOST,
      port: env.DB_PORT,
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      ssl: {
        ca: fs.readFileSync(path.join(rootDir, '..', `env/ca-certificate.crt`)).toString(),
      },
      logging: false,
      synchronize: true,
      entities: [`${rootDir}/entities/*.ts`],
      migrations: [`${rootDir}/migrations/*.ts`],
      subscribers: [`${rootDir}/subscriber/*.ts`],
    },
  ],
  swagger: {
    path: '/docs',
    spec: {
      securityDefinitions: {
        'auth:basic': {
          type: 'basic',
        },
      },
    },
  },
};

// if (NODE_ENV === Env.PROD) {
//   serverSettings.typeorm[0] = {
//     ...serverSettings.typeorm[0],
//     // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
//     // @ts-ignore
//     ssl: {
//       ca: path.join(rootDir, '..', `env/ca-certificate.crt`),
//     },
//   };
// }

export default serverSettings;
