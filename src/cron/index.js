const cron = require('node-cron');
const logger = require('../config/logger');
const { getRedisClient } = require('../config/redis');
const UsageService = require('../modules/usage/usage.service');
const TokenRepository = require('../modules/auth/token.repository');
const { REDIS_KEYS } = require('../common/constants');

const initCron = () => {
  cron.schedule('0 0 * * *', async () => {
    logger.info('Running cron: IP block cleanup');
    const redis = getRedisClient();
    const keys = await redis.keys(`${REDIS_KEYS.IP_BLOCK}:*`);
    for (const key of keys) {
      const ttl = await redis.ttl(key);
      if (ttl <= 0) await redis.del(key);
    }
  });

  cron.schedule('0 0 * * *', async () => {
    logger.info('Running cron: Expired token cleanup');
    await TokenRepository.deleteExpired();
  });

  cron.schedule('0 0 1 * *', async () => {
    logger.info('Running cron: Monthly usage reset');
    await UsageService.resetAllUsage();
  });

  logger.info('Cron jobs initialized');
};

module.exports = { initCron };
