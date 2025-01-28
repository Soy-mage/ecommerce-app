const pool = require('../config/db');

const OrderModel = {
    getAll: async () => {
        const result = await pool.query('SELECT * FROM orders');
        return result.rows;
    },
    getSpecific: async (userId) => {
        try {
            const result = await pool.query(
                'SELECT * FROM orders WHERE user_id = $1',
                [userId]
            );

            return result.rows || null;
        } catch (error) {
            console.error('Error fetching orders by user_id:', error.message);
            throw new Error('Failed to fetch any orders.');
        }
    },
}

module.exports = OrderModel;