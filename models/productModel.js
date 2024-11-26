const pool = require('../config/db');

const Product = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
  },
  create: async (name, price) => {
    const result = await pool.query(
      'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
      [name, price]
    );
    return result.rows[0];
  },
};

module.exports = Product;
