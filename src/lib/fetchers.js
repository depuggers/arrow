import axios from 'axios';
import calculateRating from './calculateRating';

export const getDetails = async (productID, dispatch) => {
  const res = await axios.get(`/products/${productID}`);
  dispatch({
    type: 'setProductDetails',
    payload: {
      product: res.data,
    },
  });
};

export const getStyles = async (productID, dispatch) => {
  const res = await axios.get(`/products/${productID}/styles`);
  dispatch({
    type: 'setProductDetails',
    payload: {
      styles: res.data.results,
    },
  });
};

export const getQuestions = async (productID, dispatch) => {
  const res = await axios.get(`/qa/questions?product_id=${productID}&count=3333`);
  dispatch({
    type: 'setProductDetails',
    payload: {
      questions: res.data.results,
    },
  });
};

export const getRating = async (productID, dispatch) => {
  const res = await axios.get(`/reviews/meta?product_id=${productID}`);
  dispatch({
    type: 'setProductDetails',
    payload: {
      rating: calculateRating(res.data),
    },
  });
};
