import React from 'react';
import '../styles.css';
import ProductDetails from './ProductDetails';
import RelatedProducts from './RelatedProducts';
import Reviews from './Reviews';

function App() {
  return (
    <>
      <ProductDetails />
      <RelatedProducts />
      <Reviews />
    </>
  );
}

export default App;
