const { celebrate, Joi } = require('celebrate');

const { isValidObjectId } = require('mongoose');

const validator = require('validator');

module.exports.validateUserData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }).unknown(),
});

module.exports.validateUserUpdateInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30),
  }).unknown(),
});

module.exports.validateMovieData = celebrate({
  body: Joi.object()
    .keys({

      country: Joi.string()
        .required()
        .min(2)
        .max(30),

      director: Joi.string()
        .required()
        .min(2)
        .max(30),

      duration: Joi.number()
        .integer()
        .required()
        .min(2)
        .max(300),

      year: Joi.string()
        .required()
        .min(4)
        .max(4),

      description: Joi.string()
        .required()
        .min(10)
        .max(150),

      image: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (validator.isURL(value)) {
            return value;
          }
          return helpers.message('Некорректный URL');
        }),

      trailerLink: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (validator.isURL(value)) {
            return value;
          }
          return helpers.message('Некорректный URL');
        }),

      thumbnail: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (validator.isURL(value)) {
            return value;
          }
          return helpers.message('Некорректный URL');
        }),

      movieId: Joi.number()
        .integer()
        .required(),

      nameRU: Joi.string()
        .required()
        .pattern(/^[а-я0-9\sёЁ]+$/i),

      nameEN: Joi.string()
        .required()
        .pattern(/^[a-z0-9\s]+$/i),

    }).unknown(),
});

module.exports.validateMovieId = celebrate({
  params: Joi.object()
    .keys({
      _id: Joi.string().required().custom((value, helpers) => {
        if (isValidObjectId(value)) {
          return value;
        }
        return helpers.message('Некорректный id фильма');
      }),
    }).unknown(),
});
