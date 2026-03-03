const jwt = require('jsonwebtoken');
const ApiError = require('../common/ApiError');
const { HTTP_STATUS, ERROR_CODES, TOKEN_TYPES } = require('../common/constants');

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRY });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRY });
};

const verifyToken = (token, type) => {
  const secret = type === TOKEN_TYPES.ACCESS ? process.env.JWT_ACCESS_SECRET : process.env.JWT_REFRESH_SECRET;
  try {
    return jwt.verify(token, secret);
  } catch {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid or expired token', ERROR_CODES.AUTHENTICATION_ERROR);
  }
};

const generateTokenPair = (payload) => ({
  accessToken: generateAccessToken(payload),
  refreshToken: generateRefreshToken(payload),
});

module.exports = { generateAccessToken, generateRefreshToken, verifyToken, generateTokenPair };
