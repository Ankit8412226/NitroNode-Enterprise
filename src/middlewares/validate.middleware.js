const ApiError = require('../common/ApiError');
const { HTTP_STATUS, ERROR_CODES } = require('../common/constants');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const message = error.details.map((d) => d.message).join(', ');
    return next(new ApiError(HTTP_STATUS.BAD_REQUEST, message, ERROR_CODES.VALIDATION_ERROR));
  }
  next();
};

module.exports = validate;
