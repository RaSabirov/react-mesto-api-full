const SALT_ROUNDS = 10;
const JWT_SECRET = 'JWT_SECRET';
// eslint-disable-next-line no-useless-escape
const regEx = /^((http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;

module.exports = {
  SALT_ROUNDS,
  JWT_SECRET,
  regEx,
};
