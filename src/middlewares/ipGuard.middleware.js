const { getRedisClient } = require('../config/redis');
const ApiError = require('../common/ApiError');
const { HTTP_STATUS, ERROR_CODES, LIMITS, REDIS_KEYS } = require('../common/constants');
const asyncHandler = require('./asyncHandler.middleware');

const ipGuard = asyncHandler(async (req, res, next) => {
  const redis = getRedisClient();
  const key = `${REDIS_KEYS.IP_BLOCK}:${req.ip}`;
  const isBlocked = await redis.get(key);
  if (isBlocked) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, 'Your IP has been blocked', ERROR_CODES.IP_BLOCKED_ERROR);
  }
  next();
});

const blockIp = async (ip, ttl = LIMITS.IP_BLOCK_TTL) => {
  const redis = getRedisClient();
  await redis.set(`${REDIS_KEYS.IP_BLOCK}:${ip}`, '1', 'EX', ttl);
};

const trackFailedLogin = async (ip) => {
  const redis = getRedisClient();
  const key = `${REDIS_KEYS.FAILED_LOGIN}:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 900);
  return count;
};

const resetFailedLogin = async (ip) => {
  const redis = getRedisClient();
  await redis.del(`${REDIS_KEYS.FAILED_LOGIN}:${ip}`);
};

module.exports = { ipGuard, blockIp, trackFailedLogin, resetFailedLogin };
