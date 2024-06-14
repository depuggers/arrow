import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import ComparisonForm from './ComparisonForm';

function RelatedProduct({ defaultProduct, defaultProductUrl }) {
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
    <div className="border border-gray-300 p-4 bg-white w-60 h-80" onClick={handleClick}>
      <div className="relative w-48 h-48 overflow-hidden rounded-lg">
        <img src={defaultProductUrl.photos[0].url} alt={defaultProduct.name} className="w-full h-full object-cover p-1 rounded-lg" />
        <button onClick={() => showModal(<ComparisonForm defaultProduct={defaultProduct} />)} type="button" className="absolute top-2 right-2 z-10">⭐️</button>
      </div>
      <p className="text-gray-500 text-center text-xs">{defaultProduct?.category.toUpperCase()}</p>
      <h3 className="font-bold text-center text-gray-900 overflow-hidden whitespace-nowrap overflow-ellipsis">{defaultProduct?.name}</h3>
      <p className="text-gray-700 text-sm text-center">{defaultProduct?.default_price}</p>
    </div>

  );
}

export default RelatedProduct;
