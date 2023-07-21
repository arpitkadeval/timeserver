const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number()
    .default(4040),
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    }),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number()
    .default(27017),
  SMTP_SERVICE: Joi.string().default('gmail'),
  SMTP_HOST: Joi.string(),
  SMTP_PORT: Joi.number().default(587),
  SMTP_SSL_ENABLE: Joi.boolean().default(true),
  SMTP_SECURE_CONNECTION: Joi.boolean().default(false),
  SMTP_USER: Joi.string().default('support@ruhame.com'),
  SMTP_PASS: Joi.string().default('Ruhame@252$')
}).unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT
  },
  mail: {
    service: envVars.SMTP_SERVICE,
    host: envVars.SMTP_HOST,
    port: envVars.SMTP_PORT,
    startssl: {
      enable: envVars.SMTP_SSL_ENABLE
    },
    secureConnection: envVars.SMTP_SECURE_CONNECTION,
    auth: {
      user: envVars.EMAIL,
      pass: envVars.PASSWORD
    }   
  },
  urlPrefix: envVars.URL_PREFIX,
  adminEmail: envVars.ADMIN_EMAIL
};

module.exports = config;
