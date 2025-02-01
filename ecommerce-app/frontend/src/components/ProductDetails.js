import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import tcgplayerImage from './tcgplayer.png';

const ProductDetails = () => {
  const { tcgplayerId } = useParams(); // Get the product ID from the URL
  const products = useSelector((state) => state.products.products); // Get products from Redux state
  console.log(products);
  const product = products.find((p) => p.tcgplayer_id === parseInt(tcgplayerId))
  console.log(product);
  const tcgplayerLink = (number) => {
    return `https://www.tcgplayer.com/product/${number}/`
  }


  return (
    <div className="product-details" key={product.tcgplayer_id}>
      <div className="simple">
        <img className="product-image" src={product.image_uri} alt="product image"></img>
        <div className="prices">

          <h3 className="product-price">✔${(Math.floor(product.price * 90)) / 100}</h3>
          <a href={tcgplayerLink(product.tcgplayer_id)} target="_blank" rel="noopener noreferrer" title="Check out this card on the TCGPlayer Market!" >
            <img src={tcgplayerImage} alt="market price"></img>
            <h3 className="tcgplayer-price">${product.price}</h3>
          </a>

        </div>
      </div>
      <div className="extended-info">
        <h1 className="product-details-name">{product.name}</h1>
        <h2 className="description">{product.description}</h2>
        <h2 className="set-name">{product.set_name}</h2>
      </div>

    </div>
  );
};

export default ProductDetails;