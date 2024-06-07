import React, { useState } from 'react';

import ProductDetails from './ProductDetails';
import RelatedProducts from './RelatedProducts';
import Reviews from './Reviews';

import AppContext from '../context/AppContext';

import '../styles/global.css';

import Logo from '../images/atelierlogo.svg';

import useModal from '../hooks/useModal';

function App() {
  const [productID, setProductID] = useState(40344);
  const [cart, setCart] = useState([]);

  const { modal, showModal, hideModal } = useModal();

  return (
    <AppContext.Provider value={{
      productID, setProductID, cart, setCart, showModal, hideModal
    }}
    >
      <header className="flex justify-between items-center text-white bg-neutral-800 px-6 py-2">
        <Logo height={96} />
        <span>
          Cart
          {cart.length > 0 ? `(${cart.length})` : null}
        </span>
      </header>
      <main>
        <ProductDetails />
        <RelatedProducts />
        <Reviews />
      </main>
      { modal }
    </AppContext.Provider>
  );
}

export default App;
