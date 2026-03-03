const AuditLog = require('./audit.model');

const create = async (data) => {
  return AuditLog.create(data);
};

const findAll = async (filter = {}, options = {}) => {
  const { page = 1, limit = 20, sort = { createdAt: -1 } } = options;
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    AuditLog.find(filter).populate('userId', 'name email').sort(sort).skip(skip).limit(limit),
    AuditLog.countDocuments(filter),
  ]);
  return { data, total, page, limit };
};

module.exports = { create, findAll };
