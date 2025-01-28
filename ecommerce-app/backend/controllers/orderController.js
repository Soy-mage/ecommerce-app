const OrderModel = require('../models/orderModel');

const OrderController = {
    async getAllOrders(req, res) {
        try {
            const orders = await OrderModel.getAll();
            res.status(200).json(orders);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async getOrdersByUserId(req, res) {
        const { userId } = req.params;
        try {
            const orders = await OrderModel.getSpecific(userId);
            if (!orders) {
                return res.status(404).json({
                    success: false,
                    message: 'Order(s) not found',
                });
            }
            res.status(200).send(orders);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch order(s). Please try again later.',
            });
        }
    }
}   

module.exports = OrderController;