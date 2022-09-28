const fs = require('fs');
const route = require('express').Router();
const errorHandler = require('../middlewares/error');
require('express-async-errors');

function LoadRouter() {
  const file = fs.readdirSync(__dirname).filter((singlefile) => {
    const f = singlefile.split('.');
    return f.length === 3 && f[1] === 'route';
  });

  file.map((filename) => {
    const routename = filename.split('.')[0];
    const apiroute = require(`./${filename}`);
    route.use(`/${routename}`, apiroute);
  });

  return route;
}

const apiroutes = LoadRouter();
apiroutes.use(errorHandler);

module.exports = apiroutes;
