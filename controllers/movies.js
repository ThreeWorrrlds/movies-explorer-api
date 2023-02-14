const MovieModel = require('../models/Movie');
const BadRequestError = require('../errors/bad-request-error');
const Forbidden = require('../errors/forbidden');
const NotFound = require('../errors/not-found');
const {
  movieMessageNotFoundOne,
  movieMessageNotFoundTwo,
  movieMessageBadReqOne,
  movieMessageBadReqTwo,
  movieMessageForbiddenOne,
} = require('../utils/constants');

module.exports.getMovies = async (req, res, next) => {
  try {
    const movies = await MovieModel.find({ owner: req.user._id });
    if (movies) {
      res.status(200).send(movies);
    } else {
      next(new NotFound(movieMessageNotFoundOne));
    }
  } catch (err) {
    next(err);
  }
};

module.exports.createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = await req.body;
    const id = await req.user._id;
    const newMovie = await MovieModel.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: id,
      movieId,
      nameRU,
      nameEN,
    });
    res.status(201).send(newMovie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(movieMessageBadReqOne));
    } else {
      next(err);
    }
  }
};

module.exports.deleteMovieById = async (req, res, next) => {
  await MovieModel.findById(req.params._id)
    .orFail(new Error('NotFound'))
    .then((movie) => {
      if (req.user._id === movie.owner.toString()) {
        MovieModel.findByIdAndRemove(req.params._id)
          .then((item) => {
            res.status(200).send({ message: `Фильм ${req.params._id} удален ${item}` });
          })
          .catch((err) => next(err));
      } else {
        next(new Forbidden(movieMessageForbiddenOne));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(movieMessageBadReqTwo));
      } else if (err.message === 'NotFound') {
        next(new NotFound(movieMessageNotFoundTwo));
      } else {
        next(err);
      }
    });
};
