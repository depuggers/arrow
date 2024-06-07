import React, { useState } from 'react';

function RelatedProduct({ defaultProduct, defaultProductUrl }) {
  return (
    <div className="card">
      <img src={defaultProductUrl.photos[0].url} width="256" height="384" alt={defaultProduct.name} />
      <p>{defaultProduct?.category}</p>
      <h3>{defaultProduct?.name}</h3>
      <p>{defaultProduct?.default_price}</p>
      <button type="button">⭐️</button>
    </div>

  );
}

export default RelatedProduct;
