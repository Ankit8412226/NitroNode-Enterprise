const express = require('express');
const UserController = require('./user.controller');
const { createUser, updateUser, getUsers } = require('./user.validation');
const { authenticate, requireRole, validate } = require('../../middlewares');
const { ROLES } = require('../../common/constants');

const router = express.Router();

router.use(authenticate);

router.route('/')
  .post(requireRole(ROLES.SUPER_ADMIN), validate(createUser), UserController.createUser)
  .get(requireRole(ROLES.SUPER_ADMIN, ROLES.ADMIN), validate(getUsers), UserController.getUsers);

router.route('/profile')
  .get(UserController.getUser)
  .patch(validate(updateUser), UserController.updateUser);

router.route('/:userId')
  .get(requireRole(ROLES.SUPER_ADMIN, ROLES.ADMIN), UserController.getUser)
  .patch(requireRole(ROLES.SUPER_ADMIN), validate(updateUser), UserController.updateUser)
  .delete(requireRole(ROLES.SUPER_ADMIN), UserController.deleteUser);

module.exports = router;
