import React, {
  useState, useContext, useRef,
} from 'react';

import {
  FaFacebook, FaRegStar, FaTwitter, FaPinterest,
} from 'react-icons/fa';
import { FaCheck, FaPlus } from 'react-icons/fa6';
import { PiCaretDownBold } from 'react-icons/pi';

import ImageGallery from './ImageGallery';
import StarRating from './StarRating';
import StyleSelector from './StyleSelector';

import AppContext from '../context/AppContext';

function Overview() {
  // const [selectedSKU, setSelectedSKU] = useState(null);
  const [selectedQty, setSelectedQty] = useState(null);

  const {
    store: { product }, store: { styles }, store: { selectedStyle }, store: { selectedSKU }, store: { rating }, dispatch,
  } = useContext(AppContext);

  const qtyRef = useRef(null);

  let sizes = [{ sku: 'null' }];
  if (styles) {
    sizes = Object.entries(styles[selectedStyle].skus).map((sku) => ({ sku: sku[0], size: sku[1].size }));
    // console.log('sizes ', sizes);
  }

  let maxQuantity;
  if (selectedSKU) {
    maxQuantity = Math.min(styles[selectedStyle].skus[selectedSKU].quantity, 15);
  }

  const addToCart = () => {
    dispatch({ type: 'addToCart', payload: { sku_id: selectedSKU, count: selectedQty } });
  };

  // console.log(product, styles, rating);
  const loading = !(product && styles && rating);

  return (
    <section className="w-full flex flex-col md:grid grid-cols-[1fr_minmax(20rem,min(30rem,30vw))] justify-items-center text-base-content">
      <ImageGallery />
      <section className="w-full flex flex-col justify-between px-8 py-8 gap-8">
        {loading
          ? <div className="w-3/4 h-4 skelly" />
          : (
            <div className="flex items-center gap-2">
              {/* (
                {rating ? rating.average : null}
                ) */}
              <StarRating rating={rating.average} size={1.5} />
              <button
                onClick={() => document.getElementById('reviews').scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })}
                className="text-sm underline"
              >
                {'Read all '}
                {rating.total}
                {' reviews'}
              </button>
            </div>
          )}
        {loading ? (
          <div className="flex flex-col gap-2">
            <div className="w-1/2 h-4 skelly" />
            <div className="w-full h-16 skelly" />
            <div className="w-3/4 h-16 skelly" />
          </div>
        ) : (
          <div>
            <h3 className="uppercase">{product.category}</h3>
            <h2 className="text-6xl font-bold">{product.name}</h2>
          </div>
        ) }
        {loading ? <div className="w-1/3 h-8 skelly" /> : (
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
        ) }
        <StyleSelector />
        <form>
          <fieldset disabled={loading} className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="relative flex-grow">
                <select
                  className=" form-input w-full uppercase cursor-pointer appearance-none disabled:opacity-25"
                  data-testid="size-selector"
                  defaultValue=""
                  onChange={(e) => {
                    dispatch({ type: 'setSelectedSKU', payload: parseInt(e.target.value) });
                    if (qtyRef.current) qtyRef.current.value = '1';
                  }}
                  disabled={sizes[0].sku === 'null'}
                >
                  <option data-testid="size-option" value="" disabled hidden>{loading ? 'Select Size' : sizes[0].sku !== 'null' ? 'Select Size' : 'OUT OF STOCK'}</option>
                  {sizes.map((size) => <option data-testid="size-option" key={size.sku} value={size.sku}>{size.size}</option>)}
                </select>
                <PiCaretDownBold size={24} className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${loading || sizes[0].sku === 'null' ? 'opacity-25' : ''}`} />
              </div>
              <div className="relative">
                <select data-testid="qty-selector" className={`form-input cursor-pointer disabled:opacity-25 appearance-none ${selectedSKU ? 'pr-12' : ''}`} ref={qtyRef} defaultValue="" disabled={!selectedSKU} onChange={(e) => setSelectedQty(parseInt(e.target.value))}>
                  <option value="" disabled hidden>—</option>
                  {Array.from({ length: maxQuantity }, (v, i) => i + 1).map((qty) => (
                    <option key={qty} value={qty}>{qty}</option>
                  ))}
                </select>
                {selectedSKU ? <PiCaretDownBold size={24} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" /> : null}
              </div>
            </div>
            <div className="flex gap-4">
              <button className="form-input flex-grow uppercase flex justify-between items-center disabled:opacity-25" type="button" onClick={addToCart} disabled={!selectedSKU}>
                Add to cart
                <span><FaPlus size={24} /></span>
              </button>
              {/* <button className="form-input" type="button"><FaRegStar size={24} /></button> */}
            </div>
          </fieldset>
        </form>
        <div className="flex justify-evenly">
          <button>
            <FaFacebook color="#0866ff" size={48} />
          </button>
          <button>
            <FaPinterest color="#e60023" size={48} />
          </button>
          <button>
            <FaTwitter color="#1d9bf0" size={48} />
          </button>
        </div>
      </section>
      <section className="col-span-2 w-full md:w-[80%] py-6 flex flex-col md:flex-row divide-y md:divide-x md:divide-y-0 items-center">
        <div className="pb-8 md:pb-0 px-8 flex-shrink flex-grow">
          {loading
            ? (
              <div className="flex flex-col gap-2">
                <div className="w-3/4 h-5 skelly" />
                <div className="w-full h-4 skelly" />
                <div className="w-full h-4 skelly" />
              </div>
            )
            : (
              <>
                <h2 className="font-bold text-lg ">{product.slogan}</h2>
                <p>{product.description}</p>
              </>
            ) }

        </div>
        <div className="pt-8 md:pt-0 px-8 flex-shrink-0 w-fit">
          <ul className="flex flex-col gap-3 w-fit">
            {loading
              ? Array.from({ length: 3 }).map((v, i) => <div key={i} className="w-48 h-4 skelly" />)
              : product.features.map((feature, i) => (
                <li className="min-w-fit flex items-center gap-2" key={i}>
                  <FaCheck size={24} />
                  {` ${feature.value} ${feature.feature}`}
                </li>
              ))}
          </ul>
        </div>
      </section>

    </section>
  );
}

export default Overview;
