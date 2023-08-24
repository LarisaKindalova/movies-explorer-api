const Movie = require('../models/movie');
const {
  CREATE, MESSAGE_ERROR_BAD_REQUEST, MESSAGE_ERROR_NOT_FOUND, MESSAGE_ERROR_FORBIDDEN,
} = require('../utils/constants');
const { BadRequest } = require('../errors/bad_request');
const { NotFound } = require('../errors/not_found');
const { ForbiddenError } = require('../errors/forbidden_err');

module.exports.createMovie = (req, res, next) => {
  console.log('req_body', req.body, 'owner', req.user._id);
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.status(CREATE).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest(MESSAGE_ERROR_BAD_REQUEST));
      }
      return next(err);
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch((err) => next(err));
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(new NotFound(MESSAGE_ERROR_NOT_FOUND))
    .then((movie) => {
      if (String(movie.owner) !== req.user._id) {
        return Promise.reject(new ForbiddenError(MESSAGE_ERROR_FORBIDDEN));
      }
      return Movie.deleteOne(movie)
        .then(() => res.send(movie));
    })
    .catch(next);
};
