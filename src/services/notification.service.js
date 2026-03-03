const emailService = require('./email.service');
const logger = require('../config/logger');

const sendNotification = async ({ userId, type, data, channels = ['email'] }) => {
  try {
    if (channels.includes('email')) {
      await emailService.sendEmail({
        to: data.email,
        templateName: type,
        templateData: data,
      });
    }

    if (channels.includes('slack')) {
      logger.info({ message: 'Slack notification placeholder', userId, type });
    }

    if (channels.includes('sms')) {
      logger.info({ message: 'SMS notification placeholder', userId, type });
    }
  } catch (err) {
    logger.error({ message: 'Notification dispatch failed', userId, type, error: err.message });
  }
};

module.exports = {
  sendNotification,
};
