const pool = require('../config/db');
const bcrypt = require('bcrypt');

const UserModel = {
    async createUser(username, email, password) {
        try {
            // Hash the password before saving to the database
            const hashedPassword = await bcrypt.hash(password, 10);

            const result = await pool.query(
                `INSERT INTO users (username, email, password) 
                 VALUES ($1, $2, $3) RETURNING id, username, email`,
                [username, email, hashedPassword]
            );

            return result.rows[0];
        } catch (error) {
            console.error('Error creating user:', error.message);
            throw new Error('Failed to create user');
        }
    },

    async findUserByUsername(username) {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0];
    }
};

module.exports = UserModel;
