const UserService = require('./user.service');
const { sendSuccess } = require('../../common/ApiResponse');
const { HTTP_STATUS } = require('../../common/constants');
const asyncHandler = require('../../middlewares/asyncHandler.middleware');

const createUser = asyncHandler(async (req, res) => {
  const user = await UserService.createUser(req.body);
  return sendSuccess(res, HTTP_STATUS.CREATED, 'User created successfully', user);
});

const getUser = asyncHandler(async (req, res) => {
  const user = await UserService.getUserById(req.params.userId || req.user._id);
  return sendSuccess(res, HTTP_STATUS.OK, 'User retrieved successfully', user);
});

const getUsers = asyncHandler(async (req, res) => {
  const result = await UserService.getUsers(req.query);
  return sendSuccess(res, HTTP_STATUS.OK, 'Users retrieved successfully', result);
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await UserService.updateUser(req.params.userId || req.user._id, req.body);
  return sendSuccess(res, HTTP_STATUS.OK, 'User updated successfully', user);
});

const deleteUser = asyncHandler(async (req, res) => {
  await UserService.deleteUser(req.params.userId);
  return sendSuccess(res, HTTP_STATUS.OK, 'User deleted successfully', null);
});

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
