import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/actions/fetchProducts';
import { scryfallFetch } from '../redux/actions/scryfallFetch';
import { updateProduct } from '../api-calls/updateProduct';

const Admin = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products); // Get products from Redux state
  const scryfall = useSelector((state) => state.scryfall.scryfall);
  const scryfallIds = [];
  for (let i = 0; i < products.length; i++) {
    scryfallIds.push(products[i].tcgplayer_id);
  }
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

  const handleUpdateProduct = () => {
    if (selectedProductId) {
      //backend action


      alert('Product updated successfully!');
    } else {
      alert('Please select a product to update.');
    }
  };

  const handleAddProduct = () => {
    if (newProductTcgplayerId) {
        //backend action


      setNewProductTcgplayerId('');
      alert('Product added successfully!');
    } else {
      alert('Please enter a valid tcgplayer ID.');
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
 
  useEffect(() => {
    dispatch(scryfallFetch(scryfallIds));
    }, [dispatch]);

  const handleScryfallDailyUpdate = async () => {
    try {
  
      for (let i = 0; i < scryfall.length; i++) {
        const product = scryfall[i];
        const tcgplayer_id = product.tcgplayer_id;
        const fields = {
          foil: product.foil,
          price: product.prices.usd,
          image_uri: product.image_uris.normal,
          description: product.oracle_text,
          set_name: product.set_name,
        }
        await updateProduct(tcgplayer_id, fields);
  
        console.log(`Updated product with tcgplayer_id: ${tcgplayer_id}`);
      }
  
      console.log('All products updated successfully.');
    } catch (error) {
      console.error('Error updating products:', error.message);
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
      <div className="section">
          <button onClick={handleScryfallDailyUpdate}>MANUAL SCRYFALL UPDATE</button>
      </div>
    </div>
  );
};

export default Admin;