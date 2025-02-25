import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar.js';
import Products from './components/Products.js';
import ProductDetails from './components/ProductDetails.js';
import Admin from './components/Admin.js';
import Register from './components/Register.js';
import Login from './components/Login.js';
import { Cart } from './components/Cart.js';
import { fetchProducts } from './redux/actions/fetchProducts.js';
import { fetchCart } from './redux/actions/fetchCart.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { AuthContext } from './AuthContext.js';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const currentUserId = JSON.parse(localStorage.getItem('user'))?.id;
  const { isLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    dispatch(fetchProducts()).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && currentUserId) {
      dispatch(fetchCart(currentUserId));
    }
  }, [isLoggedIn, currentUserId, dispatch]);

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
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:tcgplayerId" element={<ProductDetails />} />
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
    <div className="error">
      <h1>404</h1>
      <p>Page not found!</p>
    </div>
  );
}

export default App;

