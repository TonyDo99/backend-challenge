import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

export default () => ({
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
});

/**
 * @param token the namespace pointing specific one
 * @return {IEnvironmentsRoot}
 * @extends {NODE_ENV: NODE_ENV_STAGES}
 */
export const validateSchema = Joi.object({
  PORT: Joi.number().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  ACCESS_TOKEN_SECRET: Joi.string().required(),
});
