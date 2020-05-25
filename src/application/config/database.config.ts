import * as fs from 'fs';
import * as path from 'path';
import { registerAs } from '@nestjs/config';

const database = registerAs('db', () => ({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
  ssl_ca: fs.readFileSync(path.join(__dirname, '..', '..', '..', 'env/ca-certificate.crt')),
}));

export default database;
