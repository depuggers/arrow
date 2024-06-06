import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import axios from 'axios';

import ImageGallery from './ImageGallery';
import StyleSelector from './StyleSelector';

import AppContext from '../context/AppContext';

import '../styles/productdetails.css';

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [styles, setStyles] = useState(null);
  const [rating, setRating] = useState(null);
  const [selectedStyleID, setSelectedStyleID] = useState(null);
  const [selectedSKU, setSelectedSKU] = useState(null);

  const qtyRef = useRef(null);

  let selectedStyle;
  let sizes;
  if (styles && selectedStyleID) {
    selectedStyle = styles.find((style) => style.style_id === selectedStyleID);
    sizes = Object.entries(selectedStyle.skus).map((sku) => ({ sku: sku[0], size: sku[1].size }));
  }

  let maxQuantity;
  if (selectedSKU) {
    maxQuantity = Math.min(selectedStyle.skus[selectedSKU].quantity, 15);
  }

  const { productID, setProductID } = useContext(AppContext);

  const getDetails = async () => {
    const response = await axios.get(`/products/${productID}`);
    console.log(response.data);
    setProduct(response.data);
  };

  const getStyles = async () => {
    const response = await axios.get(`/products/${productID}/styles`);
    if (response.data.results) {
      setStyles(response.data.results);
      setSelectedStyleID(response.data.results[0].style_id);
      console.log(response.data.results[0]);
    }
  };

  const getRating = async () => {
    const response = await axios.get(`/reviews/meta?product_id=${productID}`);
    if (response.data) {
      const ratings = Object.entries(response.data.ratings)
        .reduce((ratings, current) => ratings.concat(Array.from({ length: parseInt(current[1]) }, (v) => parseInt(current[0]))), []);
      console.log(ratings);
      const avgRating = (ratings.reduce((sum, current) => sum + current, 0) / ratings.length).toFixed(2);
      console.log(avgRating, typeof avgRating);
      setRating({ average: avgRating, total: ratings.length });
    }
  };

  useEffect(() => {
    getDetails();
    getStyles();
    getRating();
  }, [productID]);

  const addToCart = async () => {
    const response = await axios.post('/cart', { sku_id: selectedSKU });
    console.log(response);
  };

  return (
    <section id="product-details">
      {product && selectedStyle
        ? (
          <>
            <ImageGallery selectedStyle={selectedStyle} />
            <section id="product-details-side">
              <div>
                (
                {rating ? rating.average : null}
                )* * * * *
                <a href="#">
                  Read all
                  {' '}
                  {rating ? rating.total : null}
                  {' '}
                  reviews
                </a>
                <h3>{product.category}</h3>
                <h1>{product.name}</h1>
                {selectedStyle.sale_price
                  ? (
                    <p>
                      <s>{selectedStyle.original_price}</s>
                      {' '}
                      {selectedStyle.sale_price}
                    </p>
                  )
                  : <p>{selectedStyle.original_price}</p>}
              </div>
              <StyleSelector styles={styles} selectedStyle={selectedStyle} setSelectedStyleID={setSelectedStyleID} />
              <form>
                <div>
                  <select
                    defaultValue=""
                    onChange={(e) => {
                      setSelectedSKU(parseInt(e.target.value));
                      if (qtyRef.current) qtyRef.current.value = '1';
                    }}
                  >
                    <option value="" disabled hidden>Select Size</option>
                    {sizes.map((size) => <option key={size.sku} value={size.sku}>{size.size}</option>)}
                  </select>
                  <select ref={qtyRef} defaultValue="" disabled={!selectedSKU}>
                    <option value="" disabled hidden>-</option>
                    {Array.from({ length: maxQuantity }, (v, i) => i + 1).map((qty) => (
                      <option key={qty} value={qty}>{qty}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <button type="button" onClick={addToCart}>Add to bag +</button>
                  <button type="button">*</button>
                </div>
              </form>
            </section>
            <section>
              <h2>{product.slogan}</h2>
              <p>{product.description}</p>
            </section>
          </>
        )
        : null}
    </section>
  );
}

export default ProductDetails;
