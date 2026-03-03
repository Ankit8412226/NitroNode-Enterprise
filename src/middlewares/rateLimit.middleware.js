const { getRedisClient } = require('../config/redis');
const ApiError = require('../common/ApiError');
const { HTTP_STATUS, ERROR_CODES, LIMITS, REDIS_KEYS } = require('../common/constants');
const asyncHandler = require('./asyncHandler.middleware');

const rateLimit = (options = {}) => {
  const { windowSeconds = LIMITS.RATE_LIMIT_WINDOW, maxRequests = LIMITS.RATE_LIMIT_MAX } = options;

  return asyncHandler(async (req, res, next) => {
    const redis = getRedisClient();
    const key = `${REDIS_KEYS.RATE_LIMIT}:${req.ip}`;
    const current = await redis.incr(key);
    if (current === 1) await redis.expire(key, windowSeconds);

    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - current));

    if (current > maxRequests) {
      throw new ApiError(HTTP_STATUS.TOO_MANY_REQUESTS, 'Too many requests', ERROR_CODES.RATE_LIMIT_ERROR);
    }

    next();
  });
};

module.exports = { rateLimit };
