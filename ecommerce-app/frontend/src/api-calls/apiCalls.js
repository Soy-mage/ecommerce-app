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

export const addProduct = async (tcgplayer_id) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/products/`,
            { tcgplayer_id }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error.message);
        throw new Error('Failed to add product.');
    }
};

export const deleteProduct = async (tcgplayer_id) => {
    try {
        const response = await axios.delete(
            `${process.env.REACT_APP_BACKEND_URL}/api/products/`, 
            { tcgplayer_id }
        );
        return response.data;
    } catch (error) {
        console.error('Error deleting product:', error.message);
        throw new Error('Failed to delete product.')
    }
};

export const register = async (email, password) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/users/register/`,
            { "email": email, "password": password }
        );
        return response.data;
    } catch (error) {
        console.error('There was an error with registration:', error.response ? error.response.data : error.message);

        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Error with registration');
        }
    }
};

export const addToCart = async (userId, id, quantity) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/cart/add-item`, 
            { "userId": userId, "productId": id, "quantity": quantity }
        );
        return response.data;
    } catch (error) {
        console.error('There was an error adding to cart:', error.message);
        throw new Error('Error adding to cart');
    }
};

export const createOrder = async (userId, name, address1, address2, city, state, zip) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/cart/${userId}/checkout`, 
            { "name": name, "address1": address1, "address2": address2, "city": city, "state": state, "zip": zip}
        );
        return response.data;
    } catch (error) {
        console.log("There was an error placing the order:", error.message);
        throw new Error('Error placing order');
    }
}