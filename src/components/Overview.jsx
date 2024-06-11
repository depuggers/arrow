import React, {
  useState, useContext, useRef,
} from 'react';

import { FaRegStar } from 'react-icons/fa';
import { FaCheck, FaPlus } from 'react-icons/fa6';
import { PiCaretDownBold } from 'react-icons/pi';

import ImageGallery from './ImageGallery';
import StyleSelector from './StyleSelector';

import AppContext from '../context/AppContext';

import '../styles/overview.css';

function Overview() {
  // const [selectedSKU, setSelectedSKU] = useState(null);
  const [selectedQty, setSelectedQty] = useState(null);

  const {
    store: { product }, store: { styles }, store: { selectedStyle }, store: { selectedSKU }, store: { rating }, dispatch,
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

  const addToCart = () => {
    dispatch({ type: 'addToCart', payload: { sku_id: selectedSKU, count: selectedQty } });
  };

  console.log(product, styles, rating);

  return (
    <section className="grid grid-cols-[5fr_2fr] justify-items-center text-neutral-600">
      {product
        ? (
          <>
            <ImageGallery />
            <section className="flex flex-col justify-end px-8 py-8 gap-8">
              <div className="flex items-center gap-2">
                {/* (
                {rating ? rating.average : null}
                ) */}
                <div className="rating">
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" disabled />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" disabled />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" disabled />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" disabled checked />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" disabled />
                </div>
                <button
                  onClick={() => document.getElementById('reviews').scrollIntoView({
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
                  <div className="relative flex-grow">
                    <select
                      className="form-input w-full uppercase cursor-pointer appearance-none"
                      defaultValue=""
                      onChange={(e) => {
                        dispatch({ type: 'setSelectedSKU', payload: parseInt(e.target.value) });
                        if (qtyRef.current) qtyRef.current.value = '1';
                      }}
                    >
                      <option value="" disabled hidden>Select Size</option>
                      {sizes.map((size) => <option key={size.sku} value={size.sku}>{size.size}</option>)}
                    </select>
                    <PiCaretDownBold size={24} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  <div className="relative">
                    <select className={`form-input cursor-pointer disabled:opacity-25 appearance-none ${selectedSKU ? 'pr-12' : ''}`} ref={qtyRef} defaultValue="" disabled={!selectedSKU} onChange={(e) => setSelectedQty(parseInt(e.target.value))}>
                      <option value="" disabled hidden>—</option>
                      {Array.from({ length: maxQuantity }, (v, i) => i + 1).map((qty) => (
                        <option key={qty} value={qty}>{qty}</option>
                      ))}
                    </select>
                    {selectedSKU ? <PiCaretDownBold size={24} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" /> : null}
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="form-input flex-grow uppercase flex justify-between items-center" type="button" onClick={addToCart}>
                    Add to cart
                    <span><FaPlus size={24} /></span>
                  </button>
                  <button className="form-input" type="button"><FaRegStar size={24} /></button>
                </div>
              </form>
            </section>
            <section className="col-span-2 w-[80%] py-6 flex divide-x">
              <div className="px-8 flex-shrink flex-grow">
                <h2 className="font-bold text-lg ">{product.slogan}</h2>
                <p>{product.description}</p>
              </div>
              <div className="px-8 flex-shrink-0 flex-grow">
                <ul className="flex flex-col gap-3">
                  {product.features?.map((feature) => (
                    <li className="min-w-fit flex items-center gap-2" key={feature.feature}>
                      <FaCheck size={24} />
                      {` ${feature.value} ${feature.feature}`}
                    </li>
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
