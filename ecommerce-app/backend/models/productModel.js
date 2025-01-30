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
  update: async (tcgplayer_id, fields) => {
    try {
      const values = [];
      let query = 'UPDATE products SET ';

      const setClauses = [];
      for (const [key, value] of Object.entries(fields)) {
        if (value !== undefined) {
          setClauses.push(`${key} = $${values.length + 1}`);
          values.push(value);
        }
      }

      if (setClauses.length === 0) {
        throw new Error('No valid fields provided for update.');
      }

      query += setClauses.join(', ') + ` WHERE tcgplayer_id = $${values.length + 1} RETURNING *`;
      values.push(tcgplayer_id);

      const result = await pool.query(query, values);

      // Return the updated product
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error updating product:', error.message);
      throw new Error('Failed to update the product.');
    }
  },
};

module.exports = Product;
