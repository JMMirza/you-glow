import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  APP_PORT: process.env.APP_PORT,
  PORT: process.env.PORT,
  SERVICE_NAME: process.env.SERVICE_NAME,
  JWT_TOKEN_KEY: process.env.JWT_TOKEN_KEY,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  EMAIL: process.env.EMAIL,
  DATABASE_LINK: process.env.DATABASE_LINK,
  DATABASE_NAME: process.env.DATABASE_NAME,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDGRID_EMAIL: process.env.SENDGRID_EMAIL,
};
