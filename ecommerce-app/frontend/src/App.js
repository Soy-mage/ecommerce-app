import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import NavBar from './components/NavBar.js';
import Products from './components/Products.js';

function App() {
  
  return (
    <Provider store={store}>
      <div className="App">
        <NavBar />
        <Products />
      </div>
    </Provider>
  );
}

export default App;

