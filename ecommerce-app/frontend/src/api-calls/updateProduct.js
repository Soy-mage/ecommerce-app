import axios from 'axios';

export const updateProduct = async (tcgplayer_id, fields) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/products/${tcgplayer_id}`,
      fields
    );
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error.message);
    throw new Error('Failed to update the product.');
  }
};

