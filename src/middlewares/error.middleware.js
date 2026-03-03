const ApiError = require('../common/ApiError');
const { sendError } = require('../common/ApiResponse');
const { HTTP_STATUS, ERROR_CODES } = require('../common/constants');
const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  let statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = 'Internal server error';
  let errorCode = ERROR_CODES.INTERNAL_ERROR;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errorCode = err.errorCode;
  }

  logger.error({
    message: err.message,
    requestId: req.requestId,
    userId: req.userId,
    ip: req.ip,
    route: req.originalUrl,
    method: req.method,
    statusCode,
    stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
  });

  return sendError(res, statusCode, message, errorCode);
};

const notFoundHandler = (req, res) => {
  return sendError(res, HTTP_STATUS.NOT_FOUND, 'Route not found', ERROR_CODES.NOT_FOUND_ERROR);
};

module.exports = { errorHandler, notFoundHandler };
