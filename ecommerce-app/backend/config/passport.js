const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const pool = require('../config/db');

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await UserModel.findUserByUsername(username);

            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            // Compare the provided password with the stored hash
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

// Serialize user to save user id in the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user to retrieve user information
passport.deserializeUser(async (id, done) => {
    try {
        const user = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [id]);
        done(null, user.rows[0]);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;
