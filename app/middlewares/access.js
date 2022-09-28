const User = require('../model/user.model');

async function loadUser(req, res, next) {
  const { id } = req.user;
  const user = await User.findById(id);
  if (user) {
    req.body.user = user;
    next();
  } else {
    next(new Error('User Not Found'));
  }
}

async function allowUserOnly(req, res, next) {
  if (req.user.id === req.params.userid) {
    next();
  } else {
    next(new Error('Unauthorised'));
  }
}


module.exports = {
  loadUser,
  allowUserOnly,
};
