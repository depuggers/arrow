import React, { useState } from 'react';

import ProductDetails from './ProductDetails';
import RelatedProducts from './RelatedProducts';
import Reviews from './Reviews';

import AppContext from '../context/AppContext';

function App() {
  const [productID, setProductID] = useState(40344);

  return (
    <AppContext.Provider value={{ productID, setProductID }}>
      {productID}
      <ProductDetails />
      <RelatedProducts />
      <Reviews />
    </AppContext.Provider>
  );
}

export default App;
