import * as fs from 'fs';
import * as path from 'path';
import { registerAs } from '@nestjs/config';

const { env } = process;

const database = registerAs('db', () => ({
  host: env.DB_HOST || 'localhost',
  port: parseInt(env.DB_PORT, 10),
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  name: env.DB_NAME,
  ssl_ca: fs.readFileSync(path.join(__dirname, '..', '..', '..', 'env/ca-certificate.crt')),
}));

export default database;
