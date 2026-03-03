const express = require('express');
const authRoutes = require('../../modules/auth');
const userRoutes = require('../../modules/users');
const auditRoutes = require('../../modules/audit');
const usageRoutes = require('../../modules/usage');
const { usageTracker } = require('../../middlewares');

const router = express.Router();

router.use(usageTracker);

const defaultRoutes = [
  { path: '/auth', route: authRoutes },
  { path: '/users', route: userRoutes },
  { path: '/audit', route: auditRoutes },
  { path: '/usage', route: usageRoutes },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
