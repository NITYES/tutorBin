const mongoose = require('mongoose');
const { MONGO_DB_URL} = require('../config/env');

async function DatabaseConnection(logger) {
  const connection = await mongoose.connect(MONGO_DB_URL, {});

  mongoose.connection.on('connected', () => {
    logger.info('Database connection is successfull.');
  });

  mongoose.connection.on('error', (err) => {
    logger.error(err.message, err);
  });

  mongoose.connection.on('disconnected', () => {
    logger.error('Mongoose default connection is disconnected');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.error('Mongoose default connection is disconnected, due to application termination');
      process.exit(0);
    });
  });

  return connection;
}

module.exports = DatabaseConnection;
