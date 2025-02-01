      /* const tcgplayerIds = [
      553283, 91106, 239741, 240103, 240325, 239402, 240037, 
      226669, 226670, 226671, 226673, 226674, 226675, 226676, 
      206024, 155766, 151826,
    ]; */
import axios from 'axios';

// Utility function to add a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const scryfallFetch = (...ids) => {
  return async (dispatch) => {
    dispatch({ type: 'SCRYFALL_FETCH_REQUEST' });

    // Flatten the IDs in case an array is passed
    const tcgplayerIds = Array.isArray(ids[0]) ? ids[0] : ids;

    try {
      for (let i = 0; i < tcgplayerIds.length; i++) {
        const id = tcgplayerIds[i];
        const response = await axios.get(`https://api.scryfall.com/cards/tcgplayer/${id}`);
        const product = { name: response.data.name, ...response.data };
        dispatch({ type: 'SCRYFALL_FETCH_SUCCESS', payload: product });

        // Scryfall recommends at least 20ms delay. DO NOT MODIFY!! I DON'T WANNA GET BANNED
        await delay(30);
      }
    } catch (error) {
      dispatch({ type: 'SCRYFALL_FETCH_FAILURE', payload: error.message });
    }
  };
};
