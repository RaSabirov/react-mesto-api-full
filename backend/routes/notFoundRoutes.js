const ErrorNotFound = require('../errors/ErrorNotFound');

const notFoundRoutes = (req, res, next) => {
  next(new ErrorNotFound('Такого пути не существует'));
};

module.exports = { notFoundRoutes };
