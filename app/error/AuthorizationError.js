const BaseError = require('./BaseError');

class AuthorizationError extends BaseError {
  constructor(error) {
    super(error.message);
    this.code = 401;
  }
}
module.exports = {
  AuthorizationError,
};
