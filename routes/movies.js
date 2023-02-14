const express = require('express');
const { validateMovieData, validateMovieId } = require('../middlewares/validations');
const { getMovies, createMovie, deleteMovieById } = require('../controllers/movies');

const moviesRoutes = express.Router();

moviesRoutes.get('/movies', getMovies);

moviesRoutes.post('/movies', validateMovieData, createMovie);

moviesRoutes.delete('/movies/:_id', validateMovieId, deleteMovieById);

module.exports = moviesRoutes;
