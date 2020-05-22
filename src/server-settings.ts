import * as path from 'path';
import { config as configEnv } from 'dotenv';
import { Env } from '@tsed/core';

const { env } = process;
const { NODE_ENV = Env.DEV } = env;
const pathh = path.join(__dirname, '..', `env/.env.${NODE_ENV}`);
console.log(pathh);
configEnv({ path: pathh });

const rootDir = __dirname;

const serverSettings = {
  rootDir,
  httpPort: process.env.PORT || 9000,
  httpsPort: false,
  acceptMimes: ['application/json'],
  mount: {
    '/v1': [`${rootDir}/controllers/**/**-controller.{ts,js}`],
  },
  componentsScan: [`${rootDir}/services/*.ts`, `${rootDir}/repositories/*.ts`, `${rootDir}/protocols/*.ts`],
  typeorm: [
    {
      // ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'root'
      name: 'default',
      type: 'mysql',
      host: env.DB_HOST,
      port: env.DB_PORT,
      insecureAuth: true,
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
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

export default serverSettings;
