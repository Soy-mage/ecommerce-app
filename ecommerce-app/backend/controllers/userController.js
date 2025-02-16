const UserModel = require('../models/userModel');
const passport = require('../config/passport');

const UserController = {
    async registerUser(req, res) {
        const { email, password } = req.body;

        try {
            const existingUser = await UserModel.findUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'Email is already taken.' });
            }

            const newUser = await UserModel.createUser(email, password);
            res.status(201).json({
                success: true,
                message: 'User registered successfully!',
                data: {
                    id: newUser.id,
                    email: newUser.email,
                }
            });
        } catch (error) {
            console.error('Error registering user:', error.message);
            res.status(500).json({ success: false, message: 'Failed to register user.' });
        }
    },

    async updateEmail(req, res) {
        const { userId, newEmail } = req.body;

        if (!userId || !newEmail) {
            return res.status(400).json({ success: false, message: 'User ID and new email are required.' });
        }

        try {
            const updatedUser = await UserModel.updateEmail(userId, newEmail);
            res.status(200).json({
                success: true,
                message: 'Email updated successfully',
                data: updatedUser,
            });
        } catch (error) {
            console.error('Error updating email:', error.message);
            res.status(500).json({ success: false, message: 'Failed to update email' });
        }
    },

    async updatePassword(req, res) {
        const { userId, newPassword } = req.body;

        if (!userId || !newPassword) {
            return res.status(400).json({ success: false, message: 'User ID and new password are required.' });
        }

        try {
            const updatedUser = await UserModel.updatePassword(userId, newPassword);
            res.status(200).json({
                success: true,
                message: 'Password updated successfully',
                data: updatedUser,
            });
        } catch (error) {
            console.error('Error updating password:', error.message);
            res.status(500).json({ success: false, message: 'Failed to update password' });
        }
    },

    async login(req, res, next) {
        passport.authenticate("local", (err, user, info) => {
            if (err) {
              return res.status(500).json({ message: "An error occurred during login." });
            }
        
            // If user not found or password incorrect
            if (!user) {
              return res.status(401).json({ message: info.message });
            }
        
            // Log the user in
            req.logIn(user, (err) => {
              if (err) {
                return res.status(500).json({ message: "An error occurred during login." });
              }
        
              // Respond with success message and user data
              return res.status(200).json({
                message: "Login successful!",
                user: {
                  id: user._id,
                  email: user.email,
                },
              });
            });
          })(req, res, next);
    },
    async logout(req, res) {
        req.logout((err) => {
            if (err) {
              return res.status(500).json({ message: 'Error during logout.' });
            }
            req.session.destroy((err) => {
              if (err) {
                return res.status(500).json({ message: 'Error destroying session.' });
              }
              res.clearCookie('connect.sid'); // Clear the session cookie
              return res.status(200).json({ message: 'Logout successful!' });
            });
        });
    },
};

module.exports = UserController;
