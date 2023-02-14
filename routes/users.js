const express = require('express');

const { validateUserUpdateInfo } = require('../middlewares/validations');

const { getCurrentUser, updateUserInfo } = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/users/me', getCurrentUser);

usersRoutes.patch('/users/me', validateUserUpdateInfo, updateUserInfo);

module.exports = usersRoutes;
