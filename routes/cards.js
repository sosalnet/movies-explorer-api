const router = require('express').Router();
const { celebrateCreateCard, celebrateIdCard } = require('../validators/cards');

const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', celebrateCreateCard, createCard);
router.delete('/:cardId', celebrateIdCard, deleteCardById);
router.put('/:cardId/likes', celebrateIdCard, likeCard);
router.delete('/:cardId/likes', celebrateIdCard, dislikeCard);

module.exports = router;
