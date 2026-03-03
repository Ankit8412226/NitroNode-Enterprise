require('dotenv').config();
const { connectDatabase, connectRedis, logger } = require('./src/config');
const { initCron } = require('./src/cron');
const app = require('./src/app');

const startServer = async () => {
  try {
    await connectDatabase();
    await connectRedis();

    initCron();

    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
      logger.info(`Server listening on port ${port}`);
    });

    const gracefulShutdown = () => {
      logger.info('Shutting down server...');
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
