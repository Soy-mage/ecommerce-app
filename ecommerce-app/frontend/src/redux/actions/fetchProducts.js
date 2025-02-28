import axios from 'axios';

export const fetchProducts = () => async (dispatch) => {
    dispatch({ type: 'PRODUCTS_FETCH_REQUEST' });
  
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/`);

      if (response.statusText != "OK") {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = [ ...response.data ];

      dispatch({ type: 'PRODUCTS_FETCH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'PRODUCTS_FETCH_FAILURE', payload: error.message });
    }
  };