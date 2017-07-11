require('dotenv').config();

const config = {
  dev: 'dev',
  prod: 'prod',
  port: process.env.PORT || 5000,
  expireTime: 24 * 60 * 10,
  secrets: {
    jwt: process.env.JWT || 'secret123'
  }
};

config.env = process.env.NODE_ENV || config.dev;
config.sequelizeOptions = {
  name: process.env.DB_NAME,
  pass: process.env.DB_PASS,
  dialect: 'mysql',
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  logging: console.log,
  pool: {
    max: 10,
    min: 1,
    idle: 10000
  }
};

let envConfig = require('./' + config.env);
let finalSequelize = Object.assign(config.sequelizeOptions, envConfig.sequelizeOptions);
let finalObject = Object.assign(config, envConfig);
finalObject.sequelizeOptions = finalSequelize;
module.exports = finalObject;
