import React, { useState } from 'react';

import ProductDetails from './ProductDetails';
import RelatedProducts from './RelatedProducts';
import Reviews from './Reviews';

import AppContext from '../context/AppContext';

import '../styles/global.css';
import Logo from '../images/atelierlogo.svg';

function App() {
  const [productID, setProductID] = useState(40344);
  const [cart, setCart] = useState([]);

  return (
    <AppContext.Provider value={{ productID, setProductID, cart, setCart }}>
      <header>
        <Logo height={96} />
        <span>Cart {cart.length > 0 ? `(${cart.length})` : null}</span>
      </header>
      <main>
        <ProductDetails />
        {/* <RelatedProducts /> */}
        {/* <Reviews /> */}
      </main>
    </AppContext.Provider>
  );
}

export default App;
