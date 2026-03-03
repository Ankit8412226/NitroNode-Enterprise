const AuditService = require('./audit.service');
const { sendSuccess } = require('../../common/ApiResponse');
const { HTTP_STATUS } = require('../../common/constants');
const asyncHandler = require('../../middlewares/asyncHandler.middleware');

const getLogs = asyncHandler(async (req, res) => {
  const result = await AuditService.getLogs(req.query);
  return sendSuccess(res, HTTP_STATUS.OK, 'Audit logs retrieved', result);
});

module.exports = { getLogs };
