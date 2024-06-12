import React, { useState, useEffect, useReducer } from 'react';

import axios from 'axios';

import Header from './Header';
import Overview from './Overview';
import RelatedProducts from './RelatedProducts';
import QnA from './QnA';
import Reviews from './Reviews';

import AppContext from '../context/AppContext';

import appReducer from '../reducers/appReducer';

import calculateRating from '../lib/calculateRating';

import convertStars from '../lib/convertStars';

import '../styles/global.css';

import useModal from '../hooks/useModal';

function App() {
  const [productID, setProductID] = useState(40346);

  const { modal, showModal, hideModal } = useModal();

  const [store, dispatch] = useReducer(appReducer, {
    selectedImage: 0, selectedStyle: 0, selectedSKU: null, cart: JSON.parse(localStorage.getItem('cart')) ?? [], helpfulQs: JSON.parse(localStorage.getItem('helpfulQs')) ?? [], helpfulAs: JSON.parse(localStorage.getItem('helpfulAs')) ?? [], reportedAs: JSON.parse(localStorage.getItem('reportedAs')) ?? [],
  });

  const fetchData = async () => {
    const requests = [
      axios.get(`/products/${productID}`),
      axios.get(`/products/${productID}/styles`),
      axios.get(`/qa/questions?product_id=${productID}&count=4`),
      axios.get(`/reviews/meta?product_id=${productID}`),
    ];
    const responses = await Promise.all(requests);
    dispatch({
      type: 'setProductDetails',
      payload: {
        product: responses[0].data,
        styles: responses[1].data.results,
        questions: responses[2].data.results,
        rating: calculateRating(responses[3].data),
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, [productID]);

  const url = `/reviews?product_id=${productID}`;
  const reviewUrl = `/reviews/meta?product_id=${productID}`;

  const [reviews, setReviews] = useState('');
  const [ratings, setRatings] = useState('');
  // will swap out with context

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((err) => {
        console.error('error getting data', err);
      });
  }, [productID]);

  useEffect(() => {
    axios.get(reviewUrl)
      .then((response) => {
        setRatings(response.data);
      })
      .catch((err) => {
        console.error('error getting data', err);
      });
  }, [productID]);

  const convertStars = (data) => {
    if (!data || !data.ratings) {
      console.error('invalid data');
      return {};
    }

    const stars = Object.fromEntries(Object.entries(data.ratings).map(([k, v]) => [`stars${k}`, parseInt(v)]));
    return stars;
  };

  let starRatings;
  if (ratings) {
    starRatings = convertStars(ratings);
  }

  return (
    <AppContext.Provider value={{
      productID, setProductID, showModal, hideModal, store, dispatch,
    }}
    >
      <Header />
      <main className="flex flex-col gap-6 items-center">
        <Overview />
        <div className="flex flex-col gap-6 items-center w-[80%]">
          <RelatedProducts />
          <QnA />
          <Reviews />
        </div>
      </main>
      { modal }
    </AppContext.Provider>
  );
}

export default App;
