import { GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings } from '@tsed/common';
import '@tsed/passport';
import '@tsed/swagger';
import '@tsed/typeorm';
import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as session from 'express-session';
import * as methodOverride from 'method-override';
import { User } from './entities/user';

const rootDir = __dirname;

@ServerSettings({
  rootDir,
  httpPort: process.env.PORT || 8080,
  httpsPort: false,
  acceptMimes: ['application/json'],
  mount: {
    '/v1': [`${rootDir}/controllers/**/**-controller.{ts,js}`],
  },
  componentsScan: [`${rootDir}/services/*.ts`, `${rootDir}/repositories/*.ts`, `${rootDir}/protocols/*.ts`],
  passport: {
    userInfoModel: User,
  },
  typeorm: [
    {
      name: 'default',
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'changeme',
      database: process.env.POSTGRES_DB || 'postgres',
      logging: false,
      synchronize: true,
      entities: [`${rootDir}/entities/*{.ts,.js}`],
      migrations: [`${rootDir}/migrations/*{.ts,.js}`],
      subscribers: [`${rootDir}/subscriber/*{.ts,.js}`],
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
})
export class Server extends ServerLoader {
  $beforeRoutesInit(): void | Promise<any> {
    this.use(GlobalAcceptMimesMiddleware)
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true,
        })
      )
      .use(
        session({
          secret: 'mysecretkey',
          resave: true,
          saveUninitialized: true,
          // maxAge: 36000,
          cookie: {
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge: null,
          },
        })
      );

    return null;
  }
}
