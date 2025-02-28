import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../api-calls/apiCalls';
import tcgplayerImage from './tcgplayer.png';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
    const products = useSelector((state) => state.products.products);
    const cart = useSelector((state) => state.cart.cart);
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => { setIsVisible(!isVisible) };
    const tcgplayerLink = (number) => { return `https://www.tcgplayer.com/product/${number}/` };
    const cartItemsWithProductData = cart.map(cartItem => {
        const product = products.find(product => product.id === cartItem.product_id);
        if (product) {
            return {
                ...product,
                cartQuantity: cartItem.quantity,
                user_id: cartItem.user_id,
            };
        }
        return null;
    }).filter(item => item !== null);

    console.log(cartItemsWithProductData);
    const cartPrices = [];
    cartItemsWithProductData.map((product) => { cartPrices.push(Math.floor(90 * Number(product.price)) / 100) });
    const sum = Math.floor(cartPrices.reduce((accumulator, currentValue) => accumulator + currentValue, 0) * 100) / 100;

    const [formData, setFormData] = useState({
        fullName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        if (formData.fullName && formData.address1 && formData.city && formData.state && formData.zip) {
            try {
                    await createOrder(user.id, formData.fullName, formData.address1, formData.address2, formData.city, 
                        formData.state, formData.zip);
                    alert('Order placed successfully!');
                  } catch (error) {
                    console.error('Error placing order:', error.message);
                    alert('Failed to create order. Please try again.');
                  }
        } else {
            alert('Please fill out all required forms of the checkout.')
        }
        console.log("Submitted Address:", formData);
    };

    return (
        <div className="cart">
            {cartItemsWithProductData.map((product) => (
                <div className="product" key={product.tcgplayer_id}>
                    <Link to={`/product/${product.tcgplayer_id}`}>
                        <img className="product-image" src={product.image_uri} alt="product image">
                        </img>
                    </Link>
                    <div className="text">
                        <div className="product-text">
                            <h4 className="quantity">Quantity : {product.cartQuantity}</h4>
                            <h4 className="product-name">{product.name}</h4>
                            <h4 className="set-name">{product.set_name}</h4>
                            {product.foil && <h4 className="foil-indicator rainbow-text">Foil</h4>}
                            <h4 className="foil">{product.foil}</h4>

                        </div>
                        <div className="prices">
                            <h3 className="product-price">${(Math.floor(product.price * 90)) / 100}</h3>
                        </div>
                    </div>

                </div>
            ))}
            <div className="order-total">
                <h1>Order Total:</h1>
                <h3>${sum} + $1.00 Shipping =</h3>
                <h3></h3>
                <h1>${sum + 1}</h1>

                <button onClick={toggleVisibility}><h2>Go To Checkout</h2></button>

                <h6>*All items' condition are guaranteed to be Near Mint or Lightly Played.</h6>
            </div>
            {isVisible && (
                <div className="checkout">
                    <div className="checkout-wrapper">
                        <h1 className="checkout-title">Checkout</h1>
                        <form onSubmit={handleSubmit} className="checkout-form">
                            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="input-field" required />
                            <input type="text" name="address1" placeholder="Address 1" value={formData.address1} onChange={handleChange} className="input-field" required />
                            <input type="text" name="address2" placeholder="Address 2" value={formData.address2} onChange={handleChange} className="input-field" />
                            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="input-field" required />
                            <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className="input-field" required />
                            <input type="text" name="zip" placeholder="ZIP Code" value={formData.zip} onChange={handleChange} className="input-field" required />
                            <button type="submit" className="submit-button">Place Order!</button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};