/* eslint-disable import/no-extraneous-dependencies */
const appRoot = require('app-root-path');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    handleExceptions: true,
    maxFiles: '7d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
  },
};

const logger = winston.createLogger({
  transports: [
    new DailyRotateFile(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

logger.stream = {
  write(message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;