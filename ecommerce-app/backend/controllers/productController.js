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

exports.getSpecificProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.getSpecific(parseInt(id, 10));

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).send(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch the product. Please try again later.',
    });
  }
};

exports.updateProduct = async (req, res) => {
  const { tcgplayer_Id } = req.params;
  const { price, quantity, foil, image_uri, description, set_name } = req.body;

  try {
    const updatedProduct = await Product.update(parseInt(tcgplayer_Id, 10), {
      quantity,
      price,
      foil,
      image_uri,
      description,
      set_name,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });


  } catch (error) {
    console.log(error.message);

    if (error.message === 'No valid fields provided for update.') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update the product. Please try again later.',
    });
  }
};