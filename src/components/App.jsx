import React, { useState, useEffect, useReducer } from 'react';

import Header from './Header';
import Overview from './Overview';
import RelatedProducts from './RelatedProducts';
import OutfitList from './OutfitList';
import QnA from './QnA';
import Reviews from './Reviews';

import AppContext from '../context/AppContext';
import { OutfitProvider } from '../context/OutfitContext';

import appReducer from '../reducers/appReducer';

import {
  getDetails, getStyles, getQuestions, getRating,
} from '../lib/fetchers';

import '../styles/global.css';

import useModal from '../hooks/useModal';

function App() {
  const [productID, setProductID] = useState(40359);

  const { modal, showModal, hideModal } = useModal();

  const [store, dispatch] = useReducer(appReducer, {
    selectedImage: 0, selectedStyle: 0, selectedSKU: null, cart: JSON.parse(localStorage.getItem('cart')) ?? [], helpfulQs: JSON.parse(localStorage.getItem('helpfulQs')) ?? [], helpfulAs: JSON.parse(localStorage.getItem('helpfulAs')) ?? [], reportedAs: JSON.parse(localStorage.getItem('reportedAs')) ?? [],
  });

  useEffect(() => {
    getDetails(productID, dispatch);
    getStyles(productID, dispatch);
    getQuestions(productID, dispatch);
    getRating(productID, dispatch);
  }, [productID]);

  return (
    <AppContext.Provider value={{
      productID, setProductID, showModal, hideModal, store, dispatch,
    }}
    >
      <OutfitProvider>
        <Header />
        <main className="flex flex-col gap-6 items-center">
          <Overview />
          <div className="flex flex-col gap-6 items-center w-[80%] pb-6">
            <RelatedProducts />
            <OutfitList />
            <QnA />
            <Reviews />
          </div>
        </main>
        { modal }
      </OutfitProvider>
    </AppContext.Provider>
  );
}

export default App;
