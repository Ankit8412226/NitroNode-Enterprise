const AuditRepository = require('./audit.repository');

const log = async ({ userId, action, resource, resourceId, ip, metadata }) => {
  return AuditRepository.create({ userId, action, resource, resourceId, ip, metadata });
};

const getLogs = async (query) => {
  const { page, limit, userId, action } = query;
  const filter = {};
  if (userId) filter.userId = userId;
  if (action) filter.action = action;
  return AuditRepository.findAll(filter, { page: parseInt(page) || 1, limit: parseInt(limit) || 20 });
};

module.exports = { log, getLogs };
