const express = require('express');
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getUserMe,
} = require('../controllers/userControllers');
const { validateProfile, validateAvatar, validateUserId } = require('../middlewares/validations');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/me', getUserMe);
userRoutes.get('/:userId', validateUserId, getUserById);
userRoutes.patch('/me', validateProfile, updateProfile);
userRoutes.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = { userRoutes };
