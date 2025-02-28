import React from 'react';
import { useSelector } from 'react-redux';
import tcgplayerImage from './tcgplayer.png';
import { Link } from "react-router-dom";
import { addToCart } from '../api-calls/apiCalls';

const Products = () => {
    const products = useSelector((state) => state.products.products);
    const scryfall = useSelector((state) => state.scryfall.scryfall);
    console.log(scryfall);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);
    console.log(products);
    if (loading && products.length === 0) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const tcgplayerLink = (number) => { return `https://www.tcgplayer.com/product/${number}/` };
    
    const addItemToCart = async (product) => {
        const user = JSON.parse(localStorage.getItem('user'));
        try {
            await addToCart(user.id, product.id, 1);
            console.log('product added successfully');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="products">
            <div className="disclaimer">
                <span className="product-price">✔My Price</span> 
                <div><img src={tcgplayerImage} alt="market price"></img><span className="tcgplayer-price">TCGPlayer Market</span></div>
                <br/>*All items' condition are guaranteed to be Near Mint or Lightly Played. 
            </div>
            {products.map((product) => (
                <div className="product" key={product.tcgplayer_id}>
                    <h4 className="product-name">{product.name}</h4>
                    <Link to ={`/product/${product.tcgplayer_id}`}><img className="product-image" src={product.image_uri} alt="product image"></img></Link>
                    <div className="prices">

                        <h3 className="product-price">✔${(Math.floor(product.price * 90)) / 100}</h3>
                        <a href={tcgplayerLink(product.tcgplayer_id)} target="_blank" rel="noopener noreferrer" title="Check out this card on the TCGPlayer Market!" >
                            <img src={tcgplayerImage} alt="market price"></img>
                            <h3 className="tcgplayer-price">${product.price}</h3>
                        </a>

                    </div>
                    <button className="add-to-cart-btn" onClick={() => {addItemToCart(product)}} title="Add to Cart">
                        +
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Products;