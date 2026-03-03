const asyncHandler = require('./asyncHandler.middleware');
const { authenticate } = require('./auth.middleware');
const { requireRole } = require('./role.middleware');
const { requirePermission } = require('./permission.middleware');
const { rateLimit } = require('./rateLimit.middleware');
const { ipGuard, blockIp, trackFailedLogin, resetFailedLogin } = require('./ipGuard.middleware');
const validate = require('./validate.middleware');
const upload = require('./upload.middleware');
const requestContext = require('./requestContext.middleware');
const { errorHandler, notFoundHandler } = require('./error.middleware');

module.exports = {
  asyncHandler,
  authenticate,
  requireRole,
  requirePermission,
  rateLimit,
  ipGuard,
  blockIp,
  trackFailedLogin,
  resetFailedLogin,
  validate,
  upload,
  requestContext,
  errorHandler,
  notFoundHandler,
};
