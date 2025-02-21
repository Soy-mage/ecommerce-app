import axios from 'axios';

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
      return scryfallData;
    } catch (error) {
      dispatch({ type: 'SCRYFALL_FETCH_FAILURE', payload: error.message });
      throw error;
    }
  };
};
