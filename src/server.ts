import * as Sentry from '@sentry/node';
import {
  AfterRoutesInit,
  BeforeRoutesInit,
  GlobalAcceptMimesMiddleware,
  ServerLoader,
  ServerSettings,
} from '@tsed/common';
import '@tsed/passport';
import '@tsed/swagger';
import '@tsed/typeorm';
import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as session from 'express-session';
import * as methodOverride from 'method-override';
import serverSettings from './server-settings';

Sentry.init({
  dsn: 'https://4a1edd6d10b14f56b6e42f6f0e904cea@o394149.ingest.sentry.io/5243930',
});

@ServerSettings(serverSettings)
export class Server extends ServerLoader implements AfterRoutesInit, BeforeRoutesInit {
  $beforeRoutesInit(): void | Promise<any> {
    this.use(Sentry.Handlers.requestHandler())
      .use(GlobalAcceptMimesMiddleware)
      .use(helmet())
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

  $afterRoutesInit(): void | Promise<any> {
    this.app.use(Sentry.Handlers.errorHandler());
  }
}
