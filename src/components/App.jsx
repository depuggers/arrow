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
  getDetails, getStyles, getQuestions, getRating, getRelatedProducts, getReviews,
} from '../lib/fetchers';

import '../styles/global.css';

import useModal from '../hooks/useModal';

function App() {
  const [productID, setProductID] = useState(40344);

  const { modal, showModal, hideModal } = useModal();

  const [store, dispatch] = useReducer(appReducer, {
    selectedImage: 0, selectedStyle: 0, selectedSKU: null, cart: JSON.parse(localStorage.getItem('cart')) ?? [], helpfulQs: JSON.parse(localStorage.getItem('helpfulQs')) ?? [], helpfulAs: JSON.parse(localStorage.getItem('helpfulAs')) ?? [], reportedAs: JSON.parse(localStorage.getItem('reportedAs')) ?? [],
  });

  const fetchAll = async () => {
    getDetails(productID, dispatch);
    getStyles(productID, dispatch);
    getQuestions(productID, dispatch);
    getRating(productID, dispatch);
    await getRelatedProducts(productID, dispatch);
    getReviews(productID, dispatch);
  }

  useEffect(() => {
    fetchAll();
  }, [productID]);

  useEffect(() => {
    document.title = `Arrow${store.product ? ` | ${store.product.name}` : ''}`;
  }, [store.product]);

  return (
    <AppContext.Provider value={{
      productID, setProductID, showModal, hideModal, store, dispatch, updateQnA: () => getQuestions(productID, dispatch),
    }}
    >
      <Header />
      <main className="flex flex-col gap-6 items-center pb-6">
        <Overview />
        <div className="flex flex-col gap-6 items-center px-6 md:px-0 w-full md:w-[80%]">
          <OutfitProvider>
            <RelatedProducts />
            <OutfitList />
          </OutfitProvider>
          <QnA />
          <Reviews />
        </div>
      </main>
      { modal }
    </AppContext.Provider>
  );
}

export default App;
