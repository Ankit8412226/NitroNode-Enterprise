const AuthService = require('./auth.service');
const { sendSuccess } = require('../../common/ApiResponse');
const { HTTP_STATUS } = require('../../common/constants');
const asyncHandler = require('../../middlewares/asyncHandler.middleware');

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await AuthService.login(email, password, req.ip);
  return sendSuccess(res, HTTP_STATUS.OK, 'Login successful', result);
});

const register = asyncHandler(async (req, res) => {
  const user = await AuthService.register(req.body, req.ip);
  return sendSuccess(res, HTTP_STATUS.CREATED, 'Registration successful', user);
});

const refreshTokens = asyncHandler(async (req, res) => {
  const result = await AuthService.refreshTokens(req.body.refreshToken);
  return sendSuccess(res, HTTP_STATUS.OK, 'Token refreshed successfully', result);
});

const logout = asyncHandler(async (req, res) => {
  await AuthService.logout(req.body.refreshToken);
  return sendSuccess(res, HTTP_STATUS.OK, 'Logout successful', null);
});

module.exports = {
  login,
  register,
  refreshTokens,
  logout,
};
