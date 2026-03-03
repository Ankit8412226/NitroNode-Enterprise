const sendSuccess = (res, statusCode, message, data = {}) => {
  return res.status(statusCode).json({ success: true, message, data });
};

const sendError = (res, statusCode, message, errorCode) => {
  return res.status(statusCode).json({ success: false, message, errorCode });
};

module.exports = { sendSuccess, sendError };
