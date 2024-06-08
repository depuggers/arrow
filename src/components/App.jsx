import React, { useState, useReducer } from 'react';

import Header from './Header';
import ProductDetails from './ProductDetails';
import RelatedProducts from './RelatedProducts';
import Reviews from './Reviews';

import AppContext from '../context/AppContext';

import appReducer from '../reducers/appReducer';

import '../styles/global.css';

import useModal from '../hooks/useModal';

function App() {
  const [productID, setProductID] = useState(40344);

  const { modal, showModal, hideModal } = useModal();

  const [store, dispatch] = useReducer(appReducer, {
    selectedImage: 0, selectedStyle: 0, selectedSKU: null, cart: [],
  });

  return (
    <AppContext.Provider value={{
      productID, setProductID, showModal, hideModal, store, dispatch,
    }}
    >
      <Header />
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
