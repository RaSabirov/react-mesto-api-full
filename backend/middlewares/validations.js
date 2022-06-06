const {
  celebrate, Joi, Segments,
} = require('celebrate');

const { isEmail } = require('validator');
const { regEx } = require('../config');

// Валидация для регистрации пользователя
const register = celebrate({
  [Segments.BODY]: Joi.object().keys({
    // валидация Email поля
    email: Joi.string().required().custom((value, helper) => {
      if (!isEmail(value)) {
        return helper.error('string.notEmail');
      }
      return value;
    }).messages({
      'any.required': 'Email адрес не указан',
      'string.notEmail': 'Email адрес не корректный',
    }),
    // валидация поля пароль
    password: Joi.string().required().messages({
      'any.required': 'Пароль не указан',
    }),
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимальная длина поля 2 символа',
      'string.max': 'Максимальная длина поля 30 символов',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимальная длина поля 2 символа',
      'string.max': 'Максимальная длина поля 30 символов',
    }),
    avatar: Joi.string().pattern(regEx),
  }),
});

const validateProfile = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимальная длина поля 2 символа',
      'string.max': 'Максимальная длина поля 30 символов',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимальная длина поля 2 символа',
      'string.max': 'Максимальная длина поля 30 символов',
    }),
  }),
});

const validateAvatar = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().pattern(regEx),
  }),
});

const validateCreateCard = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля 2 символа',
        'string.max': 'Максимальная длина поля 30 символов',
      }),
    link: Joi.string().required().pattern(regEx),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required()
      .messages({
        'string.length': 'Некорректное поле ID, требуемая длина должна равняться 24',
      }),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required()
      .messages({
        'string.length': 'Некорректное поле ID, требуемая длина должна равняться 24',
      }),
  }),
});

module.exports = {
  register,
  validateProfile,
  validateAvatar,
  validateCreateCard,
  validateCardId,
  validateUserId,
};
