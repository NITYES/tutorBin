const jwt = require('jsonwebtoken');
const {AuthorizationError}=require('../error/AuthorizationError')
const { JWT_SECRET_KEY } = require('../../config/env');

const verifyJwt = async function (req, res, next) {
  try {
    const authHeader = req.headers.authorization
    if(!authHeader){
      return next(new AuthorizationError('Token is required'));
    }
    const tokenArray=authHeader.split(' ');
    if(tokenArray.length!==2){
     return next(new AuthorizationError('Invalid token'));
    }
    let token=tokenArray[1]
    const result = jwt.verify(token, JWT_SECRET_KEY);
    req.user = result;
    next();
  } catch (error) {
    next(new AuthorizationError(error.message));
  }
};


module.exports = {
  verifyJwt,
};
