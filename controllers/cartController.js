const CartModel = require('../models/cartModel');

const CartController = {
    async addItem(req, res) {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || !quantity || quantity <= 0) {
            return res.status(400).json({ success: false, message: 'User ID, Product ID, and positive quantity are required.' });
        }

        try {
            const addedItem = await CartModel.addItemToCart(userId, productId, quantity);
            res.status(200).json({
                success: true,
                message: 'Item added to cart successfully',
                data: addedItem,
            });
        } catch (error) {
            console.error('Error adding item to cart:', error.message);
            res.status(500).json({ success: false, message: 'Failed to add item to cart' });
        }
    },
    async removeItem(req, res) {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || !quantity || quantity >= 0) {
            return res.status(400).json({ success: false, message: 'User ID, Product ID, and negative quantity are required.' });
        }

        try {
            const removedItem = await CartModel.removeItemFromCart(userId, productId, quantity);
            res.status(200).json({
                success: true,
                message: 'Item successfully removed from cart',
                data: removedItem,
            });
        } catch (error) {
            console.error('Error adding item to cart:', error.message);
            res.status(500).json({ success: false, message: 'Failed to remove item from cart' });
        }
    },
    async deleteItem(req, res) {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ success: false, message: 'User ID and Product ID are required.' });
        }

        try {
            const removedItem = await CartModel.removeItemFromCart(userId, productId);
            res.status(200).json({
                success: true,
                message: 'Item removed from cart successfully',
                data: removedItem,
            });
        } catch (error) {
            console.error('Error removing item from cart:', error.message);
            res.status(500).json({ success: false, message: 'Failed to remove item from cart' });
        }
    },
    async getItems(req, res) {
        const { userId } = req.params;
        console.log(req.params);
        try {
            const cart = await CartModel.getCartItems(parseInt(userId, 10));

            if (!cart) {
                return res.status(404).json({
                    success: false,
                    message: 'Cart not found',
                });
            }

            res.status(200).send(cart);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch the cart. Please try again later.',
            });
        }
    },
    async createOrder(req, res) {
        const { userId } = req.params;

        if ( !userId ) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        try {
            const order = await CartModel.createNewOrder(userId);
            res.status(200).json({
                success: true,
                message: 'Order created successfully',
                data: order,
            });
        } catch (error) {
            console.error('Error creating order:', error.message);
            res.status(500).json({ success: false, message: 'Failed to create order' });
        }
    },
};

module.exports = CartController;
