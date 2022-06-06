const { NODE_ENV, JWT_SECRET } = process.env;
const SALT_ROUNDS = 10;
const jwtKey = NODE_ENV !== 'production' ? JWT_SECRET : 'dev-secret';
// eslint-disable-next-line no-useless-escape
const regEx = /^((http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;

module.exports = {
  SALT_ROUNDS,
  jwtKey,
  regEx,
};
