import axios from 'axios';

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });

    const tcgplayerIds = [553283, 91106, 239741, 240103, 240325, 239402, 240037, 
        226669, 226670, 226671, 226673, 226674, 226675, 226676, 206024, 155766, 151826, ]
       ;
      
    // Utility function to add a delay
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    try {
      for (const id of tcgplayerIds) {
        const response = await axios.get(`https://api.scryfall.com/cards/tcgplayer/${id}`);
        const product = { name: response.data.name, ...response.data };
        dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: product });

        // Scryfall recommends at least 20ms delay. DO NOT MODIFY!! I DON'T WANNA GET BANNED
        await delay(30);
      }
    } catch (error) {
      dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
    }
  };
};

