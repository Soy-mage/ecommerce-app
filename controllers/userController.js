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
    }
};

module.exports = UserController;
