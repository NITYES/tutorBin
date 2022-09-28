const mongoose = require('mongoose');

async function DatabaseConnection(logger) {
  const connection = await mongoose.connect('mongodb://localhost:27017/myapp', {});

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
