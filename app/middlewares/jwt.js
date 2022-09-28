const jwt = require('jsonwebtoken');
const {AuthorizationError}=require('../error/AuthorizationError')
const { JWT_SECRET_KEY } = require('../../config/env');

const verifyJwt = async function (req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const result = jwt.verify(token, JWT_SECRET_KEY);
    req.user = result;
    next();
  } catch (error) {
    next(new AuthorizationError(error));
  }
};


module.exports = {
  verifyJwt,
};
