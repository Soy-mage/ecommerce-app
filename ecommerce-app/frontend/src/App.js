import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import NavBar from './components/NavBar.js';
import Products from './components/Products.js';
import ProductDetails from './components/ProductDetails.js';
import Admin from './components/Admin.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <div className="spacer"></div>
          <div className="content">
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/:id" element={<ProductDetails />} />
              <Route path="/696969" element={<Admin />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is a sample About Us page.</p>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <p>Page not found!</p>
    </div>
  );
}

export default App;

