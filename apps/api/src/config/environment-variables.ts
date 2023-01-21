import * as Joi from 'joi';

export interface EnvironmentVariables {
  DATABASE_URL: string;
  PORT: number;
}

export const validationSchemaForEnv = Joi.object<EnvironmentVariables, true>({
  DATABASE_URL: Joi.string().required(),
  PORT: Joi.number().required(),
});
