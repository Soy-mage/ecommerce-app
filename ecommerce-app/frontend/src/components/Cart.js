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

    return (
        <div className="products">
                    {cartItemsWithProductData.map((product) => (
                        <div className="product" key={product.tcgplayer_id}>
                            <h4 className="product-name">{product.name}</h4>
                            <Link to ={`/product/${product.tcgplayer_id}`}><img className="product-image" src={product.image_uri} alt="product image"></img></Link>
                            <div className="prices">
        
                                <h3 className="product-price">${(Math.floor(product.price * 90)) / 100}</h3>
        
                            </div>
                        </div>
                    ))}
                </div>
    );
};