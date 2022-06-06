const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModules');
const ErrorConfict = require('../errors/ErrorConfict');
const ErrorValidation = require('../errors/ErrorValidation');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const ErrorNotFound = require('../errors/ErrorNotFound');
const { SALT_ROUNDS, jwtKey } = require('../config');

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email }, '+password');
    if (!foundUser) {
      return next(new ErrorUnauthorized('Не верный логин или пароль'));
    }
    const isValid = await bcrypt.compare(password, foundUser.password);
    if (!isValid) {
      return next(new ErrorUnauthorized('Не верный логин или пароль'));
    }
    const token = jwt.sign({ _id: foundUser._id }, jwtKey, { expiresIn: '7d' });
    return res.send({ token });
  } catch (err) {
    return next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      email, password, name, about, avatar,
    } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return next(
        new ErrorConfict(`Пользователь ${email} уже зарегистрирован`),
      );
    }
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    });
    const userWithoutPassword = await User.findOne({ _id: user._id });
    return res.send(userWithoutPassword);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ErrorValidation('Проверьте корректность введеных данных'));
    }
    return next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (err) {
    return next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      return res.send(user);
    }
    return next(new ErrorNotFound('Пользователь не найден'));
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new ErrorValidation('Проверьте корректность введеных данных'));
    }
    return next(err);
  }
};

const getUserMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      return res.status(200).send(user);
    }
    return next(new ErrorNotFound('Пользователь не найден'));
  } catch (err) {
    return next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const foundUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (foundUser) {
      return res.send(foundUser);
    }
    return next(new ErrorNotFound('Пользователь по указанному _id не найден.'));
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ErrorValidation('Переданы некорректные данные при обновлении профиля'));
    }
    return next(err);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const foundUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );
    if (foundUser) {
      return res.send(foundUser);
    }
    return next(new ErrorNotFound('Пользователь по указанному id не найден.'));
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ErrorValidation('Переданы некорректные данные при обновлении аватара'));
    }
    return next(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  loginUser,
  createUser,
  getUserMe,
};
