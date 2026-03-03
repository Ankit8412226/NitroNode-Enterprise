const express = require('express');
const AuthController = require('./auth.controller');
const { login, register, refreshTokens, logout } = require('./auth.validation');
const { validate, ipGuard, rateLimit } = require('../../middlewares');

const router = express.Router();

router.use(ipGuard);

router.route('/login')
  .post(rateLimit({ windowSeconds: 900, maxRequests: 5 }), validate(login), AuthController.login);

router.route('/register')
  .post(rateLimit({ windowSeconds: 3600, maxRequests: 3 }), validate(register), AuthController.register);

router.route('/refresh')
  .post(validate(refreshTokens), AuthController.refreshTokens);

router.route('/logout')
  .post(validate(logout), AuthController.logout);

module.exports = router;
