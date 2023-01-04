const { transports, format } = require('winston');
const expressWinston = require('express-winston');

const requestLogger = expressWinston.logger({
  transports: [
    new transports.File({ filename: 'request.log' }),
  ],
  format: format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new transports.File({ filename: 'error.log' }),
  ],
  format: format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
