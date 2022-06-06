const express = require('express');
const { createUser, loginUser } = require('../controllers/userControllers');
const { register } = require('../middlewares/validations');

const authRoutes = express.Router();

// сначала вызовется register, а затем,
// если регистрация успешна, createUser и loginUser
authRoutes.post('/signup', register, createUser);
authRoutes.post('/signin', register, loginUser);

module.exports = {
  authRoutes,
};
