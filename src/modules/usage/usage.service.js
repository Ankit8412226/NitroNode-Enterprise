const UsageRepository = require('./usage.repository');

const trackApiCall = async (userId) => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  return UsageRepository.incrementUsage(userId, month, year, 'apiCalls', 1);
};

const getUserUsage = async (userId) => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  return UsageRepository.findByUserId(userId, month, year);
};

const resetAllUsage = async () => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  return UsageRepository.resetMonthly(month, year);
};

module.exports = {
  trackApiCall,
  getUserUsage,
  resetAllUsage,
};
