const express = require('express');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardControllers');
const { validateCreateCard, validateCardId } = require('../middlewares/validations');

const cardRoutes = express.Router();

cardRoutes.get('/', getCards);
cardRoutes.post('/', validateCreateCard, createCard);
cardRoutes.delete('/:cardId', validateCardId, deleteCard);
cardRoutes.put('/:cardId/likes', validateCardId, likeCard);
cardRoutes.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = { cardRoutes };
