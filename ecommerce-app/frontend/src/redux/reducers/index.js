import { combineReducers } from 'redux';
import scryfallReducer from './scryfallReducer';
import productsReducer from './productsReducer';

const rootReducer = combineReducers({
  scryfall: scryfallReducer,
  products: productsReducer,
  // Add more reducers as needed
});

export default rootReducer;