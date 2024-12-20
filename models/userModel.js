const pool = require('../config/db');
const bcrypt = require('bcrypt');

const UserModel = {
    async createUser(username, email, password) {
        try {
            await pool.query('BEGIN');

            const hashedPassword = await bcrypt.hash(password, 10);

            const result = await pool.query(
                'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
                [username, email, hashedPassword]
            );
            const newUser = result.rows[0];

            await pool.query(
                'INSERT INTO cart (username, user_id) VALUES ($1, $2)',
                [newUser.username, newUser.id]
            );

            await pool.query('COMMIT');
            return newUser;
        } catch (error) {
            await pool.query('ROLLBACK');
            console.error('Error creating user and cart:', error.message);
            throw new Error('Failed to create user and cart');
        } 
    },

    // currently unused
    async findUserByUsername(username) {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0];
    }, 
    // currently unused

    async updateEmail(userId, newEmail) {
        try {
            const result = await pool.query(
                'UPDATE users SET email = $1 WHERE id = $2 RETURNING id, username, email',
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
                'UPDATE users SET password = $1 WHERE id = $2 RETURNING id, username',
                [hashedPassword, userId]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error updating password:', error.message);
            throw new Error('Failed to update password');
        }
    },
};

module.exports = UserModel;
