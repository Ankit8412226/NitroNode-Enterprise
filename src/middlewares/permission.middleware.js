const ApiError = require('../common/ApiError');
const { HTTP_STATUS, ERROR_CODES, ROLES } = require('../common/constants');

const requirePermission = (permission) => (req, res, next) => {
  if (req.user.role === ROLES.SUPER_ADMIN) return next();
  const userPermissions = req.user.permissions || [];
  if (!userPermissions.includes(permission)) {
    return next(new ApiError(HTTP_STATUS.FORBIDDEN, 'Permission denied', ERROR_CODES.AUTHORIZATION_ERROR));
  }
  next();
};

module.exports = { requirePermission };
