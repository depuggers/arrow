import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import ComparisonForm from './ComparisonForm';
import StarRating from './StarRating';
import missing from '../images/missing.svg?url';

function RelatedProduct({ defaultProduct, defaultProductUrl, defaultProductRating }) {
  const { showModal, setProductID } = useContext(AppContext);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const handleClick = () => {
    setProductID(defaultProduct.id);
    scrollToTop();
  };

  return (
    defaultProductRating && defaultProductUrl && (
    <div className="relative">
      <div className="border border-gray-300 p-4 bg-white w-60 h-80 dark:bg-base-100 dark:bg-opacity-50" onClick={handleClick}>
        <div className="relative w-48 h-48 overflow-hidden rounded-lg mx-auto">
          <img src={defaultProductUrl.photos[0].url ?? missing} alt={defaultProduct.name} className="w-full h-full object-cover p-1 rounded-lg" />
        </div>
        <p className="text-gray-500 text-center text-xs">{defaultProduct?.category.toUpperCase()}</p>
        <h3 className="font-bold text-center text-gray-900 overflow-hidden whitespace-nowrap overflow-ellipsis">{defaultProduct?.name}</h3>
        <p className="text-gray-700 text-sm text-center">
          ${defaultProduct?.default_price}</p>
        <div className="transform scale-50">
          <StarRating rating={defaultProductRating.average} name={`${defaultProduct.id}rp`} />
        </div>
      </div>
      <button onClick={() => showModal(<ComparisonForm defaultProduct={defaultProduct} />)} type="button" className="absolute top-1 right-1.5 z-10">⭐️</button>
    </div>
    )
  );
}

export default RelatedProduct;
