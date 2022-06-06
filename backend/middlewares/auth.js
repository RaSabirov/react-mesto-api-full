const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new ErrorUnauthorized('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // пытаемся верифицировать токен
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new ErrorUnauthorized('Необходима авторизация'));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  return next(); // пропускаем запрос дальше
};

module.exports = auth;
