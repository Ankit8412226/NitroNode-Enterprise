const UsageService = require('../modules/usage/usage.service');
const logger = require('../config/logger');

const trackUsage = async (req, res, next) => {
  res.on('finish', async () => {
    if (req.user && req.user._id && res.statusCode < 400) {
      try {
        await UsageService.trackApiCall(req.user._id);
      } catch (err) {
        logger.error({ message: 'Auto usage tracking failed', userId: req.user._id, error: err.message });
      }
    }
  });
  next();
};

module.exports = trackUsage;
