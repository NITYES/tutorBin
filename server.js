const http = require('http');

const app = require('./app/app');
const DatabaseConnection = require('./app/database');
const { unhandledRejection } = require('./config/starter');
const { PORT } = require('./config/env');
const logger = require('./app/utils/winstonlogger');

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  logger.info(`Server started on port: ${PORT}`);
  app.logger = logger;
  DatabaseConnection(logger).then(async () => {
    logger.info('database connected successfully');
    await unhandledRejection(logger);
  }).catch((error) => {
    logger.info('something went wrong', error.message);
    process.exit(0);
  });
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


module.exports=server;