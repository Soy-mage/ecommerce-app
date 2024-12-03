const express = require('express');
const passport = require('../config/passport');
const UserController = require('../controllers/userController');

const router = express.Router();

// User registration route
router.post('/register', UserController.registerUser);

// Login route
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard', // Adjust to your desired route
    failureRedirect: '/login',
    failureFlash: true // Enable flash messages (optional, requires `connect-flash`)
}));

module.exports = router;
