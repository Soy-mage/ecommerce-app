const Product = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    const product = await Product.create(name, price);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
