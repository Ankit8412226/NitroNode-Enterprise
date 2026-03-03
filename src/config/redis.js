const Redis = require('ioredis');
const logger = require('./logger');

let redisClient;

const connectRedis = async () => {
  redisClient = new Redis(process.env.REDIS_URL);

  redisClient.on('connect', () => {
    logger.info({ message: 'Redis connected' });
  });

  redisClient.on('error', (err) => {
    logger.error({ message: 'Redis error', error: err.message });
  });

  return redisClient;
};

const getRedisClient = () => {
  if (!redisClient) {
    throw new Error('Redis client not initialized');
  }
  return redisClient;
};

module.exports = { connectRedis, getRedisClient };
