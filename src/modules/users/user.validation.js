const Joi = require('joi');
const { ROLES } = require('../../common/constants');

const createUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid(...Object.values(ROLES)),
  permissions: Joi.array().items(Joi.string()),
});

const updateUser = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  role: Joi.string().valid(...Object.values(ROLES)),
  permissions: Joi.array().items(Joi.string()),
  isActive: Joi.boolean(),
});

const getUsers = Joi.object({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1).max(100),
  role: Joi.string().valid(...Object.values(ROLES)),
});

module.exports = {
  createUser,
  updateUser,
  getUsers,
};
