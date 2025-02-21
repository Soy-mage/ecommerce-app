const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const pool = require('../config/db');

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true, // Pass the request object to the callback
    },
    async (req, email, password, done) => {
      console.log("Passport local strategy called with:", { email, password }); // Log credentials
      try {
        const user = await UserModel.findUserByEmail(email);
        if (!user) {
          console.log("User not found:", email); // Log if user not found
          return done(null, false, { message: "Incorrect email." });
        }

        const isValidPassword = await UserModel.validatePassword(password, user.password);
        if (!isValidPassword) {
          console.log("Invalid password for user:", email); // Log if password is invalid
          return done(null, false, { message: "Incorrect password." });
        }

        console.log("User authenticated successfully:", user.email); // Log success
        return done(null, user);
      } catch (err) {
        console.error("Error during authentication:", err); // Log errors
        return done(err);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/users/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        const { rows } = await pool.query(
          'SELECT * FROM users WHERE google_id = $1',
          [profile.id]
        );

        let user;
        if (rows.length > 0) {
          // User exists, return the user
          user = rows[0];
        } else {
          // User does not exist, create a new user
          const { rows: newUser } = await pool.query(
            'INSERT INTO users (google_id, email) VALUES ($1, $2) RETURNING *',
            [profile.id, profile.emails[0].value]
          );
          user = newUser[0];
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize user to save user id in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user to retrieve user information
passport.deserializeUser(async (id, done) => {
  try {
    const user = await pool.query('SELECT id, email FROM users WHERE id = $1', [id]);
    done(null, user.rows[0]);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
