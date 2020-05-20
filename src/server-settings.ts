const rootDir = __dirname;

const serverSettings = {
  rootDir,
  httpPort: process.env.PORT || 8080,
  httpsPort: false,
  acceptMimes: ['application/json'],
  mount: {
    '/v1': [`${rootDir}/controllers/**/**-controller.{ts,js}`],
  },
  componentsScan: [`${rootDir}/services/*.ts`, `${rootDir}/repositories/*.ts`, `${rootDir}/protocols/*.ts`],
  typeorm: [
    {
      name: 'default',
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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
