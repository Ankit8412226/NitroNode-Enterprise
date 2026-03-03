const Usage = require('./usage.model');

const findOrCreate = async (userId, month, year) => {
  return Usage.findOneAndUpdate(
    { userId, month, year },
    { $setOnInsert: { userId, month, year } },
    { upsert: true, new: true }
  );
};

const incrementUsage = async (userId, month, year, field, amount = 1) => {
  return Usage.findOneAndUpdate(
    { userId, month, year },
    { $inc: { [field]: amount } },
    { upsert: true, new: true }
  );
};

const findByUserId = async (userId, month, year) => {
  return Usage.findOne({ userId, month, year });
};

const resetMonthly = async (month, year) => {
  return Usage.deleteMany({ month: { $ne: month }, year: { $ne: year } });
};

module.exports = {
  findOrCreate,
  incrementUsage,
  findByUserId,
  resetMonthly,
};
