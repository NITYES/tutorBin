const BaseError = require('./BaseError');

class NotFoundError extends BaseError {
  constructor(req,message) {
    super(message);
    this.code = 400;
    this.params=req.params
  }
}
module.exports = {
    NotFoundError,
};
