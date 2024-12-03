const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, getSpecificProduct } = require('../controllers/productController');

router.get('/', getAllProducts);
router.post('/', createProduct);
router.get('/:id', getSpecificProduct);

module.exports = router;
