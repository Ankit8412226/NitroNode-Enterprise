const express = require('express');
const UsageController = require('./usage.controller');
const { authenticate } = require('../../middlewares');

const router = express.Router();

router.use(authenticate);

router.route('/me')
  .get(UsageController.getMyUsage);

module.exports = router;
