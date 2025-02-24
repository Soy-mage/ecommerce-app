import { combineReducers } from 'redux';
import scryfallReducer from './scryfallReducer';
import productsReducer from './productsReducer';
import cartReducer from './cartReducer';



const rootReducer = combineReducers({
  scryfall: scryfallReducer,
  products: productsReducer,
  cart: cartReducer
});

export default rootReducer;