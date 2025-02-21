const express = require('express');
const passport = require('../config/passport');
const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/register', UserController.registerUser);

router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

router.put('/update-email', UserController.updateEmail);

router.put('/update-password', UserController.updatePassword);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      // Successful authentication, redirect to the frontend
      res.redirect(`${process.env.GOOGLE_REDIRECT_URI}/login?user=${encodeURIComponent(JSON.stringify(req.user))}`);
    }
  );

module.exports = router;
