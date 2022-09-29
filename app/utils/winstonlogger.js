const path = require('path');

const {
  createLogger, format, transports,
} = require('winston');
require('winston-daily-rotate-file');

const {
  combine, timestamp, printf,
} = format;

const myFormat = printf(({
  level, message, timestamp,
}) => `${timestamp}  ${level}: ${message}`);

const logFilePath = path.resolve(`${__dirname}/../../log`);

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    myFormat,
  ),
  transports: [
    new transports.DailyRotateFile({
      level: 'info',
      filename: `${logFilePath}/%DATE%.log`,
      datePattern: 'DD-MM-YYYY',
      zippedArchived: true,
      maxFiles: '15d',
    }),
  ],
});


module.exports = logger;
