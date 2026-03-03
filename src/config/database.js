const mongoose = require('mongoose');
const logger = require('./logger');

const connectDatabase = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  logger.info({ message: 'MongoDB connected', host: conn.connection.host });
};

module.exports = { connectDatabase };
