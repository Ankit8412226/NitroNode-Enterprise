const { getRedisClient } = require('../config/redis');
const logger = require('../config/logger');

const set = async (key, value, ttl = 3600) => {
  try {
    const redis = getRedisClient();
    const data = JSON.stringify(value);
    await redis.set(key, data, 'EX', ttl);
  } catch (err) {
    logger.error({ message: 'Cache set failed', key, error: err.message });
  }
};

const get = async (key) => {
  try {
    const redis = getRedisClient();
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    logger.error({ message: 'Cache get failed', key, error: err.message });
    return null;
  }
};

const del = async (key) => {
  try {
    const redis = getRedisClient();
    await redis.del(key);
  } catch (err) {
    logger.error({ message: 'Cache delete failed', key, error: err.message });
  }
};

const clearPrefix = async (prefix) => {
  try {
    const redis = getRedisClient();
    const keys = await redis.keys(`${prefix}*`);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (err) {
    logger.error({ message: 'Cache clear prefix failed', prefix, error: err.message });
  }
};

module.exports = {
  set,
  get,
  del,
  clearPrefix,
};
