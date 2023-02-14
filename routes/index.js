const express = require('express');
const { auth } = require('../middlewares/auth');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const {
  createUser, login,
} = require('../controllers/users');
const { validateUserData } = require('../middlewares/validations');
const NotFound = require('../errors/not-found');

const mainRoutes = express.Router();

mainRoutes.post('/signup', validateUserData, createUser);
mainRoutes.post('/signin', validateUserData, login);

mainRoutes.use(auth);
mainRoutes.use(usersRoutes);
mainRoutes.use(moviesRoutes);

mainRoutes.use('*', (req, res, next) => {
  next(new NotFound('Неверен путь этот...'));
});

module.exports = mainRoutes;
