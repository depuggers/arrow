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
  const [selectedQty, setSelectedQty] = useState(null);

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

  const { productID, setCart } = useContext(AppContext);

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
        .reduce((allRatings, current) => allRatings.concat(Array.from(
          { length: parseInt(current[1], 10) },
          () => parseInt(current[0], 10),
        )), []);
      // console.log(ratings);
      const avgRating = (ratings.reduce((sum, current) => sum + current, 0) / ratings.length).toFixed(2);
      // console.log(avgRating, typeof avgRating);
      setRating({ average: avgRating, total: ratings.length });
    }
  };

  useEffect(() => {
    getDetails();
    getStyles();
    getRating();
  }, [productID]);

  const addToCart = async () => {
    // const response = await axios.post('/cart', { sku_id: selectedSKU });
    // console.log(response);
    setCart((prevCart) => [...prevCart, { sku_id: selectedSKU, count: selectedQty }]);
  };

  return (
    <section className="grid grid-cols-[5fr_2fr] text-neutral-600">
      {product && selectedStyle
        ? (
          <>
            <ImageGallery selectedStyle={selectedStyle} />
            <section className="flex flex-col justify-between px-4 py-6">
              <div>
                (
                {rating ? rating.average : null}
                )⭐⭐⭐⭐⭐
                <button onClick={() => document.getElementsByClassName('review-container')[0].scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })}
                >
                  Read all
                  {' '}
                  {rating ? rating.total : null}
                  {' '}
                  reviews
                </button>
              </div>
              <div>
                <h3 className="uppercase">{product.category}</h3>
                <h2 className="text-6xl font-bold">{product.name}</h2>
              </div>
              <div>
                {selectedStyle.sale_price
                  ? (
                    <p>
                      <s>
                        $
                        {selectedStyle.original_price}
                      </s>
                      {' $'}
                      {selectedStyle.sale_price}
                    </p>
                  )
                  : (
                    <p>
                      $
                      {selectedStyle.original_price}
                    </p>
                  )}
              </div>
              <StyleSelector styles={styles} selectedStyle={selectedStyle} setSelectedStyleID={setSelectedStyleID} />
              <form className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <select
                    className="input flex-grow uppercase cursor-pointer appearance-none"
                    defaultValue=""
                    onChange={(e) => {
                      setSelectedSKU(parseInt(e.target.value));
                      if (qtyRef.current) qtyRef.current.value = '1';
                    }}
                  >
                    <option value="" disabled hidden>Select Size</option>
                    {sizes.map((size) => <option key={size.sku} value={size.sku}>{size.size}</option>)}
                  </select>
                  <select className="input cursor-pointer disabled:opacity-25 appearance-none" ref={qtyRef} defaultValue="" disabled={!selectedSKU} onChange={(e) => setSelectedQty(parseInt(e.target.value))}>
                    <option value="" disabled hidden>-</option>
                    {Array.from({ length: maxQuantity }, (v, i) => i + 1).map((qty) => (
                      <option key={qty} value={qty}>{qty}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-4">
                  <button className="input flex-grow uppercase flex justify-between" type="button" onClick={addToCart}>
                    Add to cart
                    <span>+</span>
                  </button>
                  <button className="input" type="button">⭐</button>
                </div>
              </form>
            </section>
            <section className="col-span-2 px-[15%] py-6 flex divide-x">
              <div className="px-8 flex-shrink">
                <h2 className="font-bold text-lg ">{product.slogan}</h2>
                <p>{product.description}</p>
              </div>
              <div className="px-8 flex-shrink-0">
                <ul className="flex flex-col gap-3">
                  {product.features?.map((feature) => (
                    <li className="min-w-fit" key={feature.feature}>{`✔️ ${feature.value} ${feature.feature}`}</li>
                  ))}
                </ul>
              </div>
            </section>
          </>
        )
        : null}
    </section>
  );
}

export default ProductDetails;
