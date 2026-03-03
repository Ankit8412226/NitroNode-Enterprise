const UserRepository = require('../users/user.repository');
const AuditService = require('../audit/audit.service');
const TokenRepository = require('./token.repository');
const { generateTokenPair } = require('../../services/token.service');
const { trackFailedLogin, resetFailedLogin, blockIp } = require('../../middlewares/ipGuard.middleware');
const ApiError = require('../../common/ApiError');
const { HTTP_STATUS, ERROR_CODES, AUDIT_ACTIONS, LIMITS, TOKEN_TYPES } = require('../../common/constants');

const login = async (email, password, ip) => {
  const user = await UserRepository.findByEmail(email, true);

  if (!user || !(await user.comparePassword(password))) {
    const attempts = await trackFailedLogin(ip);
    if (attempts >= LIMITS.MAX_FAILED_LOGINS) {
      await blockIp(ip);
      throw new ApiError(HTTP_STATUS.TOO_MANY_REQUESTS, 'Too many failed attempts. IP blocked.', ERROR_CODES.IP_BLOCKED_ERROR);
    }
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid credentials', ERROR_CODES.AUTHENTICATION_ERROR);
  }

  if (!user.isActive) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Account is disabled', ERROR_CODES.AUTHENTICATION_ERROR);
  }

  const tokens = generateTokenPair({ userId: user._id, role: user.role });

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await Promise.all([
    TokenRepository.saveToken({
      token: tokens.refreshToken,
      user: user._id,
      type: TOKEN_TYPES.REFRESH,
      expires: expiresAt,
    }),
    UserRepository.updateById(user._id, { lastLogin: new Date() }),
    resetFailedLogin(ip),
    AuditService.log({
      userId: user._id,
      action: AUDIT_ACTIONS.LOGIN,
      resource: 'Auth',
      ip,
    }),
  ]);

  return { user, tokens };
};

const register = async (userData, ip) => {
  const user = await UserRepository.create(userData);

  await AuditService.log({
    userId: user._id,
    action: AUDIT_ACTIONS.CREATE,
    resource: 'User',
    resourceId: user._id,
    ip,
    metadata: { email: user.email },
  });

  return user;
};

const refreshTokens = async (refreshToken) => {
  const tokenDoc = await TokenRepository.findToken(refreshToken, TOKEN_TYPES.REFRESH);
  if (!tokenDoc) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid refresh token', ERROR_CODES.AUTHENTICATION_ERROR);
  }

  const user = await UserRepository.findById(tokenDoc.user);
  if (!user || !user.isActive) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'User not found or inactive', ERROR_CODES.AUTHENTICATION_ERROR);
  }

  const tokens = generateTokenPair({ userId: user._id, role: user.role });

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await Promise.all([
    TokenRepository.deleteToken(refreshToken, TOKEN_TYPES.REFRESH),
    TokenRepository.saveToken({
      token: tokens.refreshToken,
      user: user._id,
      type: TOKEN_TYPES.REFRESH,
      expires: expiresAt,
    }),
  ]);

  return tokens;
};

const logout = async (refreshToken) => {
  const tokenDoc = await TokenRepository.findToken(refreshToken, TOKEN_TYPES.REFRESH);
  if (!tokenDoc) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Refresh token not found', ERROR_CODES.NOT_FOUND_ERROR);
  }
  await TokenRepository.deleteToken(refreshToken, TOKEN_TYPES.REFRESH);
};

module.exports = {
  login,
  register,
  refreshTokens,
  logout,
};
