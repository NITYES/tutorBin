
const { success } = require('../httpAPI/responseWrapper');
const User = require('../model/user.model');
const logger = require('../utils/winstonlogger');

class UserController {
  async createUser(req, res) {
    logger.info(`Create user called with following data :${req.body}`);
    const { name, email, password } = req.body;
    const isUserRegistered = await User.findOne({ email: email });
    if (isUserRegistered) {
      return res.status(400).json({
        success:false,
        message:'Email registered already',
        statusCode:400,
        data:null
      });
    }

    const newUser = new User({
      name: name,
      email: email,
      password: password,
    });
    await newUser.save();
    return res.json(success(newUser));
  }
}

module.exports = UserController;
