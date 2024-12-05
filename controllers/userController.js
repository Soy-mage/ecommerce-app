const UserModel = require('../models/userModel');

const UserController = {
    async registerUser(req, res) {
        const { username, email, password } = req.body;

        try {
            const existingUser = await UserModel.findUserByUsername(username);
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'Username is already taken.' });
            }

            const newUser = await UserModel.createUser(username, email, password);
            res.status(201).json({
                success: true,
                message: 'User registered successfully!',
                data: {
                    id: newUser.id,
                    username: newUser.username,
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
};

module.exports = UserController;
