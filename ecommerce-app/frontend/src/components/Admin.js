import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Admin = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products); // Get products from Redux state

  // State for selected product, foil, quantity, and new product tcgplayerId
  const [selectedProductId, setSelectedProductId] = useState('');
  const [foil, setFoil] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [newProductTcgplayerId, setNewProductTcgplayerId] = useState('');

  // Handle product selection from dropdown
  const handleProductSelect = (e) => {
    const productId = e.target.value;
    setSelectedProductId(productId);

    // Find the selected product and set its current foil and quantity values
    const selectedProduct = products.find((p) => p.id === parseInt(productId, 10));
    if (selectedProduct) {
      setFoil(selectedProduct.foil || false);
      setQuantity(selectedProduct.quantity || 0);
    }
  };

  // Handle updating the selected product
  const handleUpdateProduct = () => {
    if (selectedProductId) {
      //backend action


      alert('Product updated successfully!');
    } else {
      alert('Please select a product to update.');
    }
  };

  // Handle adding a new product
  const handleAddProduct = () => {
    if (newProductTcgplayerId) {
        //backend action


      setNewProductTcgplayerId(''); // Clear the input
      alert('Product added successfully!');
    } else {
      alert('Please enter a valid tcgplayer ID.');
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = () => {
    if (selectedProductId) {
        //backend action


      setSelectedProductId(''); // Reset the selected product
      alert('Product deleted successfully!');
    } else {
      alert('Please select a product to delete.');
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
            <option key={product.id} value={product.id}>
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
    </div>
  );
};

export default Admin;