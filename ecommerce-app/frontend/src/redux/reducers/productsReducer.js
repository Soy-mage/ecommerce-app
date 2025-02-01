const initialProductsState = {
    products: [],
    loading: false,
    error: null,
  };

const productsReducer = (state = initialProductsState, action) => {
    switch (action.type) {
      case 'DB_FETCH_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case 'DB_FETCH_SUCCESS':
        return {
          ...state,
          loading: false,
          products: action.payload,
        };
  
      case 'DB_FETCH_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default productsReducer;