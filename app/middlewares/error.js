const { Error } = require('mongoose');
const { ValidationError,AuthorizationError,NotFoundError } = require('../error');
const { DatabaseError } = require('../httpAPI/responseWrapper');
const logger=require('../utils/winstonlogger')
module.exports = function (err, req, res, next) {
  // Handle Database error
  logger.error(`${err.name}:${err.message}:${err.stack}`)
  if (err instanceof Error) {
    return DatabaseError(err, res);
  }

  // Handle Body validation error
  if (err instanceof ValidationError) {
    return res.status(err.code).json({
      success: false,
      name: err.name,
      message: err.message,
      error: {
        feild: err.feild,
      },
    });
  }

if(err instanceof NotFoundError){
  return res.status(err.code).json({
    success: false,
    name: err.name,
    message: err.message,
    error: {
      params: err.params,
    },
  });
}

  return res.status(err.code || 500).json({
    success: false,
    name: err.name,
    message: err.message || 'something went wrong',
    error: err,
  });
};
