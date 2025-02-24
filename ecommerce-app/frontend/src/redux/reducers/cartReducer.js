const initialCartState = {
    cart: [],
    loading: false,
    error: null,
  };

const cartReducer = (state = initialCartState, action) => {
    switch (action.type) {
      case 'CART_FETCH_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case 'CART_FETCH_SUCCESS':
        return {
          ...state,
          loading: false,
          cart: action.payload,
        };
  
      case 'CART_FETCH_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default cartReducer;