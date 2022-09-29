const envPath = `${__dirname}/${process.env.NODE_ENV === 'PROD' ? 'prod.env' : 'dev.env'}`;
require('dotenv').config({ path: envPath });

module.exports = {
  APPLICATION_API_KEY: process.env.APPLICATION_API_KEY || '1897732yh93hb84h8re',
  PORT: 4000,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRES_TIME: process.env.JWT_EXPIRES_TIME,
  MONGO_DB_URL: process.env.MONGO_DB_URL,
};
