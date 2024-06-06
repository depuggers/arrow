import React, { useState } from 'react';

import ProductDetails from './ProductDetails';
import RelatedProducts from './RelatedProducts';
import Reviews from './Reviews';

import AppContext from '../context/AppContext';

import '../styles/global.css';

function App() {
  const [productID, setProductID] = useState(40344);

  return (
    <AppContext.Provider value={{ productID, setProductID }}>
      <ProductDetails />
      {/* <RelatedProducts /> */}
      {/* <Reviews /> */}
    </AppContext.Provider>
  );
}

export default App;
