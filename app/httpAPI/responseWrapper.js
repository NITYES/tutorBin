function success(data, message = 'Request is Successful', statusCode = 200) {
  return {
    message,
    success: true,
    data,
    statusCode,
  };
}

function errorResponse(message = 'something went wrong', error = null, statusCode = 500) {
  return {
    name: 'unknown error',
    message,
    success: false,
    error,
    statusCode,
  };
}

function DatabaseError(err, res) {
  if (err.name === 'ValidationError') {
    let [extra, feild, message] = err.message.split(':');
    if (message.includes('Cast')) {
      message = `${feild} is Invalid Type`;
    }
    return res.status(400).json({
      success: false,
      name: err.name,
      message: message || err.message,
      error: {
        extra,
        feild,
      },
    });
  }
  if (err.name === 'DocumentNotFoundError') {
    return res.status(400).json({
      success: false,
      name: err.name,
      message: err.message.replaceAll('"', ''),
      error: {
        extra: 'Document is deleted',
      },
    });
  }

  if (err.name === 'CastError') {
    const path = err.path === '_id' ? 'id' : err.path;
    const message = `${path} is Invalid`;
    return res.status(400).json({
      success: false,
      name: err.name,
      message: message,
      error: {
        feild: path,
      },
    });
  }

  return res.status(400).json({
    success: false,
    name: err.name,
    message: err.message,
    error: err,
  });
}

module.exports = {
  success,
  errorResponse,
  DatabaseError,
};
