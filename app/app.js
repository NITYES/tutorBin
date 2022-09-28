const express = require('express');
const morgan = require('morgan');


const apiRoutes = require('./routes');

const app = express();

// application middleware
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', apiRoutes);

// route not found middlewares
app.use((req, res) => {
  res.status(500).json({
    error: 'Route no found',
  });
});

module.exports = app;
