const express = require('express');
const AuditController = require('./audit.controller');
const { getLogs } = require('./audit.validation');
const { authenticate, requireRole, validate } = require('../../middlewares');
const { ROLES } = require('../../common/constants');

const router = express.Router();

router.use(authenticate, requireRole(ROLES.SUPER_ADMIN, ROLES.ADMIN));

router.route('/')
  .get(validate(getLogs), AuditController.getLogs);

module.exports = router;
