const initialScryfallState = {
    scryfall: [],
    loading: false,
    error: null,
  };

const scryfallReducer = (state = initialScryfallState, action) => {
  switch (action.type) {
    case 'SCRYFALL_FETCH_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'SCRYFALL_FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        scryfall: [
          ...state.scryfall.filter(
            (product) => product.id !== action.payload.id // Keep only products with unique IDs
          ),
          action.payload,
        ],
      };
    case 'SCRYFALL_FETCH_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default scryfallReducer;