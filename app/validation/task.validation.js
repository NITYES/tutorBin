const joi = require('joi');
const { ValidationError } = require('../error/ValidationError');

class TaskValidation {
  validateBody = (schema, obj, next) => {
    const { error } = schema.validate(obj);
    if (error) {
      throw new ValidationError(error);
    }
    next();
  };


  updateTaskValidation = (req, res, next) => {
    // define schema
    const schema = joi.object({
      content: joi.string().max(500).required(),
      status: joi.boolean().required(),
    });
    this.validateBody(schema, req.body, next);
  };
}


module.exports = new TaskValidation();
