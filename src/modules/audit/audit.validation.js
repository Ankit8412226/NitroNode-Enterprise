const Joi = require('joi');

const getLogs = Joi.object({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1).max(100),
  userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  action: Joi.string(),
});

module.exports = { getLogs };
