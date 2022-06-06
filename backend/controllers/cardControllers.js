const ErrorForbitten = require('../errors/ErrorForbitten');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorValidation = require('../errors/ErrorValidation');
const Card = require('../models/cardModules');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (err) {
    return next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;

    const card = await Card.create(
      { name, link, owner },
    );
    return res.status(201).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ErrorValidation('Переданы некорректные данные при создании карточки'));
    }
    return next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return next(new ErrorNotFound('Карточка с указанным _id не найдена'));
    }
    const cardOwnwer = card.owner;
    if (userId.toString() === cardOwnwer.toString()) {
      const deleteCardById = await Card.findByIdAndRemove(req.params.cardId);
      return res.send(deleteCardById);
    }
    return next(new ErrorForbitten('Ограничение доступа к удалению карточки'));
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new ErrorValidation('Передан некорректный ID'));
    }
    return next(err);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (card) {
      return res.send(card);
    }
    return next(new ErrorNotFound('Переданы некорректные данные для установки лайка'));
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new ErrorValidation('Передан несуществующий id карточки'));
    }
    return next(err);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (card) {
      return res.send(card);
    }
    return next(new ErrorNotFound('Переданы некорректные данные для снятия лайка'));
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new ErrorValidation('Передан несуществующий id карточки'));
    }
    return next(err);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
