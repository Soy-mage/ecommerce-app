      /* const tcgplayerIds = [
      553283, 91106, 239741, 240103, 240325, 239402, 240037, 
      226669, 226670, 226671, 226673, 226674, 226675, 226676, 
      206024, 155766, 151826,
    ]; */
import axios from 'axios';

// Utility function to add a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const scryfallFetch = (scryfallIds) => {
  return async (dispatch) => {
    dispatch({ type: 'SCRYFALL_FETCH_REQUEST' });

    try {
      const scryfallData = [];
      for (let i = 0; i < scryfallIds.length; i++) {
        const id = scryfallIds[i];
        const response = await axios.get(`https://api.scryfall.com/cards/tcgplayer/${id}`);
        const product = { name: response.data.name, ...response.data };
        scryfallData.push(product);
        await delay(20);
      }

      dispatch({ type: 'SCRYFALL_FETCH_SUCCESS', payload: scryfallData });
      return scryfallData; // Return the fetched data
    } catch (error) {
      dispatch({ type: 'SCRYFALL_FETCH_FAILURE', payload: error.message });
      throw error; // Throw the error to propagate it
    }
  };
};
