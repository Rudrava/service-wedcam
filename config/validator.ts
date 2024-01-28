import * as joi from 'joi';

export const validationSchema: joi.ObjectSchema<Record<string, string>> =
  joi.object({
    PORT: joi.number().default(8080),
    NODE_ENV: joi
      .string()
      .valid('development', 'production', 'test', 'provision')
      .default('development'),
  });
