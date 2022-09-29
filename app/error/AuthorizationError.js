const BaseError = require('./BaseError');

class AuthorizationError extends BaseError {
  constructor(message) {
    super(message);
    this.code = 401;
  }
}
module.exports = {
  AuthorizationError,
};
