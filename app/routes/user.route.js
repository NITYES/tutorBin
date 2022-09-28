const route = require('express').Router();
const UserController = require('../controller/user.controller');
const userValidation = require('../validation/user.validation');

const User = new UserController();

route.post('/create', userValidation.newUser, User.createUser);

module.exports = route;
