const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, getSpecificProduct, updateProduct, deleteProduct} = require('../controllers/productController');

router.get('/', getAllProducts);
router.post('/', createProduct);
router.get('/:id', getSpecificProduct);
router.put('/:tcgplayer_Id', updateProduct);
router.delete('/', deleteProduct);

module.exports = router;
