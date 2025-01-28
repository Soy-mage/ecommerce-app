const express = require('express');
const CartController = require('../controllers/cartController');

const router = express.Router();

router.post('/add-item', CartController.addItem);
router.put('/remove-item', CartController.removeItem);
router.delete('/delete-item', CartController.deleteItem);
router.get('/:userId', CartController.getItems);
router.post('/:userId/checkout', CartController.createOrder);

module.exports = router;
