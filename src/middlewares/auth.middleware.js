const { verifyToken } = require('../services/token.service');
const UserRepository = require('../modules/users/user.repository');
const ApiError = require('../common/ApiError');
const asyncHandler = require('./asyncHandler.middleware');
const { HTTP_STATUS, ERROR_CODES, TOKEN_TYPES } = require('../common/constants');

const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Access token required', ERROR_CODES.AUTHENTICATION_ERROR);
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token, TOKEN_TYPES.ACCESS);
  const user = await UserRepository.findById(decoded.userId);

  if (!user || !user.isActive) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'User not found or inactive', ERROR_CODES.AUTHENTICATION_ERROR);
  }

  req.user = user;
  req.userId = user._id;
  next();
});

module.exports = { authenticate };
