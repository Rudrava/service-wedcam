import * as joi from 'joi';

export const validationSchema: joi.ObjectSchema<Record<string, string>> =
  joi.object({
    PORT: joi.number().default(8080),
    NODE_ENV: joi
      .string()
      .valid('development', 'production', 'test', 'provision')
      .default('development'),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_PORT: joi.string().default(5432),
    DB_NAME: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRE_AFTER: joi.string().required(),
    JWT_ISSUER: joi.string().required(),
  });
