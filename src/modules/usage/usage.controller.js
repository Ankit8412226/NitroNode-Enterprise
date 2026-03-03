const UsageService = require('./usage.service');
const { sendSuccess } = require('../../common/ApiResponse');
const { HTTP_STATUS } = require('../../common/constants');
const asyncHandler = require('../../middlewares/asyncHandler.middleware');

const getMyUsage = asyncHandler(async (req, res) => {
  const usage = await UsageService.getUserUsage(req.user._id);
  return sendSuccess(res, HTTP_STATUS.OK, 'Usage statistics retrieved', usage);
});

module.exports = {
  getMyUsage,
};
