const multer = require('multer');
const ApiError = require('../common/ApiError');
const { HTTP_STATUS, ERROR_CODES } = require('../common/constants');

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid file type', ERROR_CODES.VALIDATION_ERROR), false);
    }
  },
});

module.exports = upload;
