const pool = require('../config/db');
const bcrypt = require('bcrypt');

const UserModel = {
    async createUser(email, password) {
        try {

            const hashedPassword = await bcrypt.hash(password, 10);

            const result = await pool.query(
                'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING email',
                [email, hashedPassword]
            );
            const newUser = result.rows[0];
            return newUser;
        } catch (error) {
            console.error('Error creating user:', error.message);
            throw new Error('Failed to create user');
        } 
    },

    async findUserByEmail(email) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }, 

    async updateEmail(userId, newEmail) {
        try {
            const result = await pool.query(
                'UPDATE users SET email = $1 WHERE id = $2 RETURNING id, email',
                [newEmail, userId]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error updating email:', error.message);
            throw new Error('Failed to update email');
        }
    },

    async updatePassword(userId, newPassword) {
        try {
            // Hash the new password before saving it to the database
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            const result = await pool.query(
                'UPDATE users SET password = $1 WHERE id = $2 RETURNING id',
                [hashedPassword, userId]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error updating password:', error.message);
            throw new Error('Failed to update password');
        }
    },
    async validatePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    },
};

module.exports = UserModel;
