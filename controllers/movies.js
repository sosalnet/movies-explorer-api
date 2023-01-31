const ServerError = require('../errors/ServerError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const Movie = require('../models/movie');
const ForbiddenError = require('../errors/ForbiddenError');
const HTTPError = require('../errors/HTTPError');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send({ data: movies }))
    .catch((err) => next(new ServerError(err.message)));
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы неверные данные'));
      } else {
        next(new ServerError(err.message));
      }
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Карточка не обнаружена.');
      } else if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError('Нет прав к данному действию');
      } else {
        return movie.remove()
          .then(() => movie);
      }
    })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы неверные данные для удаления карточки.'));
      } else if (err instanceof HTTPError) {
        next(err);
      } else {
        next(new ServerError(err.message));
      }
    });
};
