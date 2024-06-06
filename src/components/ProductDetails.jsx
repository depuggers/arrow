import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import ImageGallery from './ImageGallery';
import StyleSelector from './StyleSelector';

import AppContext from '../context/AppContext';

import '../styles/productdetails.css';

function ProductDetails() {
  const [product, setProduct] = useState(null);

  const { productID, setProductID } = useContext(AppContext);

  const getDetails = async () => {
    const response = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productID}`, {
      headers: {
        Authorization: process.env.GH_TOKEN,
      },
    });
    setProduct(response.data);
  };

  useEffect(() => {
    getDetails();
  }, [productID]);

  return (
    <>
      {product
        ? (
          <section id="product-details">
            <ImageGallery />
            <section>
              * * * * *
              <a href="#">Read all reviews</a>
              <h3>{product.category}</h3>
              <h1>{product.name}</h1>
              <p>{product.price}</p>
              <p>
                <span>STYLE &gt;</span>
                {' '}
                selected style
              </p>
              <StyleSelector styles={[1, 2, 3, 4, 5, 6, 7, 8]} />
              <form>
                <div>
                  <select>
                    <option value="1">Default style</option>
                  </select>
                  <select>
                    <option value="1">1</option>
                  </select>
                </div>
                <div>
                  <button>Add to bag +</button>
                  <button>*</button>
                </div>
              </form>
            </section>
            <section>
              <h2>{product.slogan}</h2>
              <p>{product.description}</p>
            </section>
          </section>
        )
        : null}
    </>
  );
}

export default ProductDetails;
