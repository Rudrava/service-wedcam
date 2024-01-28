import { registerAs } from '@nestjs/config';

export const dbConfig =  registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 5432,
}));
