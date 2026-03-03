const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');
const { requestContext, errorHandler, notFoundHandler } = require('./middlewares');
const { corsOptions, logger } = require('./config');
const { LIMITS, HTTP_STATUS } = require('./common/constants');
const routes = require('./routes/v1');

const app = express();

app.use(requestContext);

app.use(helmet());
app.disable('x-powered-by');

app.use(express.json({ limit: LIMITS.BODY_SIZE }));
app.use(express.urlencoded({ extended: true, limit: LIMITS.BODY_SIZE }));

app.use(xss());
app.use(mongoSanitize());

app.use(cors(corsOptions));
app.use(hpp());

app.get('/health', (req, res) => {
  res.status(HTTP_STATUS.OK).json({ status: 'UP', timestamp: new Date() });
});

app.use('/api/v1', routes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
