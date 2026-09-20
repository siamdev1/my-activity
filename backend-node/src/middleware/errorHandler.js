const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`Unhandled API Error: ${err.message}`, { stack: err.stack, path: req.path });

  const statusCode = err.statusCode || 500;
  const response = {
    success: false,
    error: err.name || 'InternalServerError',
    message: err.message || 'An unexpected error occurred on the server.',
  };

  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
