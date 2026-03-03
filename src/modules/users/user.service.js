const UserRepository = require('./user.repository');
const ApiError = require('../../common/ApiError');
const { HTTP_STATUS, ERROR_CODES } = require('../../common/constants');

const createUser = async (userData) => {
  const existingUser = await UserRepository.findByEmail(userData.email);
  if (existingUser) {
    throw new ApiError(HTTP_STATUS.CONFLICT, 'Email already exists', ERROR_CODES.CONFLICT_ERROR);
  }
  return UserRepository.create(userData);
};

const getUserById = async (userId) => {
  const user = await UserRepository.findById(userId);
  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found', ERROR_CODES.NOT_FOUND_ERROR);
  }
  return user;
};

const updateUser = async (userId, updateData) => {
  const user = await UserRepository.updateById(userId, updateData);
  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found', ERROR_CODES.NOT_FOUND_ERROR);
  }
  return user;
};

const deleteUser = async (userId) => {
  const user = await UserRepository.deleteById(userId);
  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found', ERROR_CODES.NOT_FOUND_ERROR);
  }
  return user;
};

const getUsers = async (query) => {
  const { page, limit, role } = query;
  const filter = {};
  if (role) filter.role = role;
  return UserRepository.findAll(filter, { page: parseInt(page) || 1, limit: parseInt(limit) || 10 });
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUsers,
};
