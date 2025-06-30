import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // APP_CONFIG
  ENV: Joi.string().valid('dev', 'production', 'test').default('dev'),
  APP_HOST: Joi.string().uri().required(),
  APP_PORT: Joi.number().port().required(),
});
