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
  getSpecific: async (id) => {
    try {
      const result = await pool.query(
          'SELECT * FROM products WHERE id = $1',
          [id]
      );

      return result.rows[0] || null;
  } catch (error) {
      console.error('Error fetching product by id:', error.message);
      throw new Error('Failed to fetch the product.');
  }
  },
};

module.exports = Product;
