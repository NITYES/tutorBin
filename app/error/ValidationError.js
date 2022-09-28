const BaseError = require('./BaseError');

class ValidationError extends BaseError {
  constructor(error) {
    super(error.message.replaceAll('"', ' '));
    this.code = 400;
    this.feild = error.details[0].path[0];
    this.body = error._original;
  }
}
module.exports = {
  ValidationError,
};
