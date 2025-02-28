const pool = require('../config/db');

const CartModel = {
    async addItemToCart(userId, productId, quantity) {
        try {
            const existingItem = await pool.query(
                'SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2',
                [userId, productId]
            );

            if (existingItem.rows.length > 0) {
                const updatedItem = await pool.query(
                    'UPDATE cart_items SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3 RETURNING *',
                    [quantity, userId, productId]
                );
                return updatedItem.rows[0];
            } else {
                const newItem = await pool.query(
                    'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
                    [userId, productId, quantity]
                );
                return newItem.rows[0];
            }
        } catch (error) {
            console.error('Error adding item to cart:', error.message);
            throw new Error('Failed to add item to cart');
        }
    },
    async removeItemFromCart(userId, productId, quantity) {
        try {
            const itemToRemove = await pool.query(
                'UPDATE cart_items SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3 AND quantity > 0 RETURNING *',
                    [quantity, userId, productId]
            );
            if (!itemToRemove.rows.length) {
                throw new Error('Item not found or quantity already at zero');
            }

            const updatedQuantity = itemToRemove.rows[0].quantity;
            if (updatedQuantity < 1) {
               await pool.query(
                    'DELETE FROM cart_items WHERE user_id = $1 AND product_id =$2',
                    [userId, productId]
                );
            }
            
            return itemToRemove.rows[0];

        } catch (error) {
            console.error('Error removing item from cart:', error.message);
            throw new Error('Failed to remove item from cart');
        }
    },
    async deleteItemFromCart(userId, productId) {
        try {
            const result = await pool.query(
                'DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2 RETURNING *',
                [userId, productId]
            );

            if (result.rows.length === 0) {
                throw new Error('Item not found in the cart');
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error removing item from cart:', error.message);
            throw new Error('Failed to remove item from cart');
        }
    },
    async getCartItems(userId) {
        try {
            const result = await pool.query(
                'SELECT * FROM cart_items WHERE user_id = $1', [userId]
            )
            if (result.rows.length === 0) {
                throw new Error('No items found in cart');
            }
            return result.rows;
        } catch (error) {
            console.error('Error finding cart:', error.message);
            throw new Error('Failed to find cart');
        }
    },
    async createNewOrder(userId, name, address1, address2, city, state, zip) {
        try {
            const orderResult = await pool.query(
                'INSERT INTO orders (user_id, name, address_1, address_2, city, state, zip) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [userId, name, address1, address2, city, state, zip]
            );
            const order = orderResult.rows[0];
            console.log(order);

            await pool.query('BEGIN');

            const cartItems = await pool.query(
                'SELECT * FROM cart_items WHERE user_id = $1',
                [userId]
            );
            if (cartItems.rows.length === 0) {
                throw new Error('Cart is empty, cannot create order');
            }
            let itemIncrement = 0;
            const orderItemsQueries = cartItems.rows.map((item) => {
                itemIncrement++;
                console.log(`Current item is ${itemIncrement} and order number is ${order.id}.`)
                return pool.query(
                    'INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)',
                    [order.id, item.product_id, item.quantity]
                );
            });
            await Promise.all(orderItemsQueries);
            await pool.query('DELETE FROM cart_items WHERE user_id = $1', [userId]);
            await pool.query('COMMIT');

            return order;
        } catch (error) {
            console.error('Error creating order:', error.message);
            await pool.query('ROLLBACK');
            throw new Error('Failed to create order');
        }
    },
};

module.exports = CartModel;