const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
  deleteAccount
} = require('../controllers/authController');
const { auth } = require('../middleware/auth');
const { validate, userSchemas } = require('../middleware/validation');

const router = express.Router();

// Public routes
router.post('/register', validate(userSchemas.register), register);
router.post('/login', validate(userSchemas.login), login);

// Private routes
router.use(auth); // Apply auth middleware to all routes below
router.get('/me', getMe);
router.post('/logout', logout);
router.put('/profile', validate(userSchemas.updateProfile), updateProfile);
router.put('/password', changePassword);
router.delete('/account', deleteAccount);

module.exports = router;