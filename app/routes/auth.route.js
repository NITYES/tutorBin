const route = require('express').Router();
const AuthController = require('../controller/auth.controller');

const Auth = new AuthController();

route.post('/login', Auth.login);

module.exports = route;
