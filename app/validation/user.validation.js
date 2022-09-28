const joi = require('joi');
const { ValidationError } = require('../error/ValidationError');

class UserValidation {
  validateBody = (schema, obj, next) => {
    const { error } = schema.validate(obj);
    if (error) {
      throw new ValidationError(error);
    }
    next();
  };

  newUser = (req, res, next) => {
    // define schema
    const schema = joi.object({
      password: joi.string().required(),
      name: joi.string().required(),
      email: joi.string().email(),
    });
    this.validateBody(schema, req.body, next);
  };
}


module.exports = new UserValidation();
