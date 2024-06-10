import React, { useState } from 'react';

function RelatedProduct({ defaultProduct, defaultProductUrl }) {
  return (
    <div className="border border-gray-300 p-4 bg-white">
      <div className="relative w-64 h-96 overflow-hidden rounded-lg">
        <img src={defaultProductUrl.photos[0].url} alt={defaultProduct.name} className="w-full h-full object-cover p-1 rounded-lg" />
        <button type="button" className="absolute top-2 right-2 z-10">⭐️</button>
      </div>
      <p className="text-gray-500 text-center text-xs">{defaultProduct?.category.toUpperCase()}</p>
      <h3 className="font-bold text-center text-gray-900">{defaultProduct?.name}</h3>
      <p className="text-gray-700 text-sm text-center">{defaultProduct?.default_price}</p>
    </div>

  );
}

export default RelatedProduct;
