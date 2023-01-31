const router = require('express').Router();
const { celebrateCreateMovie, celebrateIdMovie } = require('../validators/movies');

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrateCreateMovie, createMovie);
router.delete('/:_id', celebrateIdMovie, deleteMovieById);

module.exports = router;
