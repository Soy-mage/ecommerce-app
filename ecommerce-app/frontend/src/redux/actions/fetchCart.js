import axios from 'axios';

export const fetchCart = (userId) => async (dispatch) => {
    dispatch({ type: 'CART_FETCH_REQUEST' });
  
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cart/${userId}`);

      if (response.statusText != "OK") {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = [ ...response.data ];

      dispatch({ type: 'CART_FETCH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'CART_FETCH_FAILURE', payload: error.message });
    }
  };