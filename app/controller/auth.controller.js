const jwt = require('jsonwebtoken');


const User = require('../model/user.model');
const { JWT_SECRET_KEY, JWT_EXPIRES_TIME } = require('../../config/env');

class Auth {
  async login(req, res) {
    const { password, email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success:false,
        message: 'Email not registered',
      });
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success:false,
        message: 'Wrong email or Password',
      });
    }
    // create token;
    const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_TIME });
    return res.json({
      user: user,
      token: token,
    });
  }
}

module.exports = Auth;

