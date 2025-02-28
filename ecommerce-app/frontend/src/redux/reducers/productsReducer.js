const initialProductsState = {
    products: [],
    loading: false,
    error: null,
  };

const productsReducer = (state = initialProductsState, action) => {
    switch (action.type) {
      case 'PRODUCTS_FETCH_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case 'PRODUCTS_FETCH_SUCCESS':
        return {
          ...state,
          loading: false,
          products: action.payload,
        };
  
      case 'PRODUCTS_FETCH_FAILURE':
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