async function unhandledRejection(logger) {
  process.on('uncaughtException', (exception) => {
    logger.error(exception.message, exception);
  });

  // catching unhandledRejection
  process.on('unhandledRejection', (rejection) => {
    logger.error(rejection);
  });

  // just incase warning are needed to be logged
  process.on('warning', (warning) => {
    logger.warn(`Warning,${warning}`);
  });
}

module.exports = {
  unhandledRejection,
};
