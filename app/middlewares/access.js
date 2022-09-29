const User = require('../model/user.model');
const {AuthorizationError}=require('../error/AuthorizationError')
async function loadUser(req, res, next) {
  const { id } = req.user;
  const user = await User.findById(id);
  if (user) {
    req.user = user;
    next();
  } else {
    next(new Error('User Not Found'));
  }
}

async function allowUserOnly(req, res, next) {
  if (req.user.id === req.params.userid) {
    next();
  } else {
    next(new AuthorizationError('Unauthorised User'));
  }
}


module.exports = {
  loadUser,
  allowUserOnly,
};
