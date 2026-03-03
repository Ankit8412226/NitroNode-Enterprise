const ApiError = require('../common/ApiError');
const { HTTP_STATUS, ERROR_CODES, ROLES } = require('../common/constants');

const requireRole = (...roles) => (req, res, next) => {
  if (req.user.role === ROLES.SUPER_ADMIN) return next();
  if (!roles.includes(req.user.role)) {
    return next(new ApiError(HTTP_STATUS.FORBIDDEN, 'Insufficient role', ERROR_CODES.AUTHORIZATION_ERROR));
  }
  next();
};

module.exports = { requireRole };
