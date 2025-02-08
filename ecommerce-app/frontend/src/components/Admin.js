import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/actions/fetchProducts';
import { scryfallFetch } from '../redux/actions/scryfallFetch';
import { updateProduct, addProduct } from '../api-calls/apiCalls.js';

const Admin = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [foil, setFoil] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [newProductTcgplayerId, setNewProductTcgplayerId] = useState('');

  const handleProductSelect = (e) => {
    const productId = e.target.value;
    setSelectedProductId(productId);
    const selectedProduct = products.find((p) => p.id === parseInt(productId, 10));
    if (selectedProduct) {
      setFoil(selectedProduct.foil || false);
      setQuantity(selectedProduct.quantity || 0);
    }
  };

  const handleAddProduct = async () => {
    if (newProductTcgplayerId) {
      try {
        await addProduct(newProductTcgplayerId);
        setNewProductTcgplayerId('');
        alert('Product added successfully!');
      } catch (error) {
        console.error('Error adding product:', error.message);
        alert('Failed to add product. Please try again.');
      }

    } else {
      alert('Please enter a valid tcgplayer ID.');
    }
  };

  const handleUpdateProduct = async () => {
    if (selectedProductId) {
      try {
        const fields = {
          foil: foil,
          quantity: quantity,
        }
        await updateProduct(selectedProductId, fields);
        setSelectedProductId('');
        setFoil('');
        alert('Product updated successfully!');
      } catch (error) {
        console.error('Error updating product:', error.message);
        alert('Failed to update product. Please try again.');
      }

      alert('Product updated successfully!');
    } else {
      alert('Please select a product to update.');
    }
  };

  const handleDeleteProduct = () => {
    if (selectedProductId) {
      //backend action


      setSelectedProductId('');
      alert('Product deleted successfully!');
    } else {
      alert('Please select a product to delete.');
    }
  };

const handleScryfallDailyUpdate = async () => {
  try {
    const scryfallIds = [];
    for (let i = 0; i < products.length; i++) {
      scryfallIds.push(products[i].tcgplayer_id); }
      // Step 1: Fetch Scryfall data and wait for it to complete
      const scryfallData = await dispatch(scryfallFetch(scryfallIds));
    // Step 2: Ensure scryfall data is available
    if (!scryfallData || scryfallData.length === 0) {
      throw new Error('No Scryfall data available.');
    }
      // Step 3: Loop through the scryfall data and update each product
      for (let i = 0; i < scryfallData.length; i++) {
        const product = scryfallData[i];
        const tcgplayer_id = product.tcgplayer_id;

        // Construct the fields object
        const fields = {
          name: product.name,
          price: product.prices?.usd,
          image_uri: product.image_uris?.normal,
          description: product.oracle_text,
          set_name: product.set_name,
        };

        // Step 4: Update the product
        await updateProduct(tcgplayer_id, fields);

        console.log(`Updated product with tcgplayer_id: ${tcgplayer_id}`);
      }

      // Step 5: Notify the user
      alert('All products updated successfully.');
    } catch (error) {
      console.error('Error updating products:', error.message);
      alert('Failed to update products. Please check the console for details.');
    }
  };


  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      {/* Product Selection Dropdown */}
      <div className="section">
        <h2>Update Product</h2>
        <select value={selectedProductId} onChange={handleProductSelect}>
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.tcgplayer_id} value={product.tcgplayer_id}>
              {product.name} (ID: {product.tcgplayer_id})
            </option>
          ))}
        </select>

        {/* Foil Checkbox */}
        <label>
          <input
            type="checkbox"
            checked={foil}
            onChange={(e) => setFoil(e.target.checked)}
          />
          Foil
        </label>

        {/* Quantity Input */}
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          />
        </label>

        {/* Update Button */}
        <button onClick={handleUpdateProduct}>Update Product</button>

        {/* Delete Button */}
        <button onClick={handleDeleteProduct}>Delete Product</button>
      </div>

      {/* Add New Product Section */}
      <div className="section">
        <h2>Add New Product</h2>
        <label>
          TCGPlayer ID:
          <input
            type="text"
            value={newProductTcgplayerId}
            onChange={(e) => setNewProductTcgplayerId(e.target.value)}
          />
        </label>
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <div className="section">
        <button onClick={handleScryfallDailyUpdate}>MANUAL SCRYFALL UPDATE</button>
      </div>
    </div>
  );
};

export default Admin;