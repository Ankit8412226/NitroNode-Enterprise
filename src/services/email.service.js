const nodemailer = require('nodemailer');
const logger = require('../config/logger');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: Number(process.env.EMAIL_PORT) === 465,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

const templates = {
  welcome: (data) => ({
    subject: `Welcome to ${data.appName}`,
    html: `<h1>Welcome, ${data.name}!</h1><p>Your account has been created successfully.</p>`,
  }),
  passwordReset: (data) => ({
    subject: 'Password Reset Request',
    html: `<h1>Password Reset</h1><p>Use this token: <strong>${data.token}</strong></p><p>Expires in 1 hour.</p>`,
  }),
  loginAlert: (data) => ({
    subject: 'New Login Detected',
    html: `<h1>Login Alert</h1><p>A new login was detected from IP: ${data.ip} at ${data.time}.</p>`,
  }),
};

const sendEmail = async ({ to, templateName, templateData }) => {
  const template = templates[templateName];
  if (!template) throw new Error(`Email template '${templateName}' not found`);

  const { subject, html } = template(templateData);
  try {
    await transporter.sendMail({ from: process.env.EMAIL_FROM, to, subject, html });
    logger.info({ message: 'Email sent', to, templateName });
  } catch (err) {
    logger.error({ message: 'Email send failed', to, templateName, error: err.message });
    throw err;
  }
};

module.exports = { sendEmail };
