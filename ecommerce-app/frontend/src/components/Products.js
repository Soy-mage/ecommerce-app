import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import tcgplayerImage from './tcgplayer.png';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

const Products = () => {
    const products = useSelector((state) => state.products.products);  
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);
    const scryfall = useSelector((state) => state.scryfall.scryfall); 
    // const test = useSelector((state) => state);
    console.log(products);
    // console.log(scryfall);
    if (loading && products.length === 0) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const tcgplayerLink = (number) => {
        return `https://www.tcgplayer.com/product/${number}/`
    }

    // console.log(products);

    return (
        <div className="products">
            {products.map((product) => (
                <div className="product" key={product.tcgplayer_id}>
                    <h4 className="product-name">{product.name}</h4>
                    <Link to ={`/${product.tcgplayer_id}`}><img className="product-image" src={product.image_uri} alt="product image"></img></Link>
                    <div className="prices">

                        <h3 className="product-price">✔${(Math.floor(product.price * 90)) / 100}</h3>
                        <a href={tcgplayerLink(product.tcgplayer_id)} target="_blank" rel="noopener noreferrer" title="Check out this card on the TCGPlayer Market!" >
                            <img src={tcgplayerImage} alt="market price"></img>
                            <h3 className="tcgplayer-price">${product.price}</h3>
                        </a>

                    </div>

                </div>
            ))}
        </div>
    );
};

export default Products;