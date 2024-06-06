import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import ImageGallery from './ImageGallery';
import StyleSelector from './StyleSelector';

import AppContext from '../context/AppContext';

import '../styles/productdetails.css';

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [styles, setStyles] = useState(null);
  const [selectedStyleID, setSelectedStyleID] = useState(null);

  let selectedStyle;
  if (styles && selectedStyleID) {
    selectedStyle = styles.find((style) => style.style_id === selectedStyleID);
  }

  const { productID, setProductID } = useContext(AppContext);

  const getDetails = async () => {
    const response = await axios.get(`/products/${productID}`);
    setProduct(response.data);
  };

  const getStyles = async () => {
    const response = await axios.get(`/products/${productID}/styles`);
    if (response.data.results) {
      setStyles(response.data.results);
      setSelectedStyleID(response.data.results[0].style_id);
      console.log(response.data.results);
    }
  };

  useEffect(() => {
    getDetails();
    getStyles();
  }, [productID]);

  return (
    <>
      {product
        ? (
          <section id="product-details">
            <ImageGallery selectedStyle={selectedStyle} />
            <section>
              * * * * *
              <a href="#">Read all reviews</a>
              <h3>{product.category}</h3>
              <h1>{product.name}</h1>
              <p>{product.default_price}</p>
              <p>
                <span>STYLE &gt;</span>
                {' '}
                selected style
              </p>
              <StyleSelector styles={styles} selectedStyleID={selectedStyleID} setSelectedStyleID={setSelectedStyleID} />
              <form>
                <div>
                  <select onChange={(e) => setSelectedStyleID(parseInt(e.target.value))}>
                    {styles ? styles.map((style) => <option key={style.style_id} value={style.style_id}>{style.name}</option>) : null}
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
