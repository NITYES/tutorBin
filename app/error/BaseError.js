class BaseError extends Error {
  constructor(
    message,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.success = false;
  }
}

module.exports = BaseError;
