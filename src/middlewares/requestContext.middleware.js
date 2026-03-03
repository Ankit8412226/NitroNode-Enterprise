const { v4: uuidv4 } = require('uuid');

const requestContext = (req, res, next) => {
  const requestId = req.headers['x-request-id'] || uuidv4();
  req.requestId = requestId;
  req.startTime = Date.now();
  res.setHeader('x-request-id', requestId);
  next();
};

module.exports = requestContext;
