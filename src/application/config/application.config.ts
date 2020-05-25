import { registerAs } from '@nestjs/config';

const { env } = process;

const application = registerAs('app', () => ({
  port: parseInt(env.PORT, 10),
}));

export default application;
