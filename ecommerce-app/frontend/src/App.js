import './App.css';
import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar.js';
import Products from './components/Products.js';
import ProductDetails from './components/ProductDetails.js';
import Admin from './components/Admin.js';
import Register from './components/Register.js';
import Login from './components/Login.js';
import { fetchProducts } from './redux/actions/fetchProducts.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    dispatch(fetchProducts()).then(() => setLoading(false));
  }, [dispatch]);


  if (loading) return <h1>Loading...</h1>;

  return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="spacer"></div>
          <div className="content">
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/:tcgplayerId" element={<ProductDetails />} />
              <Route path="/696969" element={<Admin />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </Router>
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

