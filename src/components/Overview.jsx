import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import axios from 'axios';

import ImageGallery from './ImageGallery';
import StyleSelector from './StyleSelector';

import AppContext from '../context/AppContext';

import '../styles/overview.css';

function Overview() {
  // const [selectedSKU, setSelectedSKU] = useState(null);
  const [selectedQty, setSelectedQty] = useState(null);

  const {
    productID, store: { product }, store: { styles }, store: { selectedStyle }, store: { selectedSKU }, store: { rating }, dispatch,
  } = useContext(AppContext);

  const qtyRef = useRef(null);

  let sizes;
  if (styles) {
    sizes = Object.entries(styles[selectedStyle].skus).map((sku) => ({ sku: sku[0], size: sku[1].size }));
  }

  let maxQuantity;
  if (selectedSKU) {
    maxQuantity = Math.min(styles[selectedStyle].skus[selectedSKU].quantity, 15);
  }

  const calculateRating = (data) => {
    const ratings = Object.entries(data.ratings)
      .reduce((allRatings, current) => allRatings.concat(Array.from(
        { length: parseInt(current[1], 10) },
        () => parseInt(current[0], 10),
      )), []);
    const avgRating = (ratings.reduce((sum, current) => sum + current, 0) / ratings.length).toFixed(2);
    return { average: avgRating, total: ratings.length };
  };

  const fetchData = async () => {
    const requests = [
      axios.get(`/products/${productID}`),
      axios.get(`/products/${productID}/styles`),
      axios.get(`/reviews/meta?product_id=${productID}`),
    ];
    const responses = await Promise.all(requests);
    dispatch({
      type: 'setProductDetails',
      payload: {
        product: responses[0].data,
        styles: responses[1].data.results,
        rating: calculateRating(responses[2].data),
      },
    });
  };

  console.log(product, styles, rating);

  useEffect(() => {
    fetchData();
  }, [productID]);

  const addToCart = () => {
    dispatch({ type: 'addToCart', payload: { sku_id: selectedSKU, count: selectedQty } });
  };

  return (
    <section className="grid grid-cols-[5fr_2fr] text-neutral-600">
      {product
        ? (
          <>
            <ImageGallery />
            <section className="flex flex-col justify-end px-4 py-8 gap-8">
              <div>
                (
                {rating ? rating.average : null}
                )⭐⭐⭐⭐⭐
                <button onClick={() => document.getElementsByClassName('review-container')[0].scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })}
                className="text-sm underline"
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
              <div className="text-3xl font-medium">
                {styles[selectedStyle].sale_price
                  ? (
                    <p>
                      <s className="text-lg">
                        $
                        {styles[selectedStyle].original_price}
                      </s>
                      {' $'}
                      {styles[selectedStyle].sale_price}
                    </p>
                  )
                  : (
                    <p>
                      $
                      {styles[selectedStyle].original_price}
                    </p>
                  )}
              </div>
              <StyleSelector styles={styles} selectedStyle={selectedStyle} />
              <form className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <select
                    className="input flex-grow uppercase cursor-pointer appearance-none"
                    defaultValue=""
                    onChange={(e) => {
                      dispatch({ type: 'setSelectedSKU', payload: parseInt(e.target.value) });
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

export default Overview;
