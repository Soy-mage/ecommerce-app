const express = require('express');
const passport = require('../config/passport');
const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/register', UserController.registerUser);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));

router.put('/update-email', UserController.updateEmail);

router.put('/update-password', UserController.updatePassword);



module.exports = router;
