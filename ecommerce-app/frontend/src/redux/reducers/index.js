import { combineReducers } from 'redux';
import productsReducer from './productsReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  // Add more reducers as needed
});

export default rootReducer;