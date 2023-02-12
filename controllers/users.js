const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
const BadRequestError = require('../errors/bad-request-error');
const Conflict = require('../errors/conflict');
const NotFound = require('../errors/not-found');
const Unauthorized = require('../errors/unauthorized');

const { NODE_ENV, JWT_SECRET = 'dev-secret' } = process.env;

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => UserModel.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user) {
        return res.status(201).send({
          email: user.email,
          name: user.name,
        });
      }
      next();
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при регистрации пользователя'));
      }
      if (err.code === 11000) {
        next(new Conflict('Такой пользователь уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  return UserModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      return res.send({ token });
    })
    .catch(() => {
      next(new Unauthorized('Неправильный логин или пароль'));
    });
};

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const currentUser = await UserModel.findById(req.user._id);
    if (currentUser) {
      res.status(200).send(currentUser);
    } else {
      next(new NotFound('Пользователь не найден'));
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Невалидный id'));
    } else {
      next(err);
    }
  }
};

module.exports.updateUserInfo = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const newInfoAboutUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true, upsert: false },
    );
    res.status(200).send(newInfoAboutUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Некорректные данные при обновлении профиля'));
    } else {
      next(err);
    }
  }
};
