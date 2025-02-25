import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import tcgplayerImage from './tcgplayer.png';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
    const products = useSelector((state) => state.products.products);
    const cart = useSelector((state) => state.cart.cart);
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
                            <h4 className="quantity">Quantity : {product.quantity}</h4>
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

                <button><Link to={`/checkout`}><h2>Checkout</h2></Link></button>

                <h6>*All items' condition are guaranteed to be Near Mint or Lightly Played.</h6>
            </div>
        </div>
    );
};