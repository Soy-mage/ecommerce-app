const express = require('express');
const OrderController = require('../controllers/orderController');

const router = express.Router();

router.get('/', OrderController.getAllOrders);
router.get('/:userId', OrderController.getOrdersByUserId);

module.exports = router;