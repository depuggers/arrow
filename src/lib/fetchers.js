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

export const getRelatedProducts = async (productID, dispatch) => {
  const response = await axios.get(`/products/${productID}/related`);
  const relatedProductIds = response.data;

  const productPromises = relatedProductIds.map((item) => axios.get(`/products/${item}`));
  const ratingPromises = relatedProductIds.map((item) => axios.get(`/reviews/meta?product_id=${item}`));

  const productResponses = await Promise.all(productPromises);
  const ratingResponses = await Promise.all(ratingPromises);

  const relatedProductsData = productResponses.map((res) => res.data);

  const ratings = ratingResponses.map((res) => calculateRating(res.data));

  const stylePromises = relatedProductsData.map((product) => axios.get(`/products/${product.id}/styles`));
  const styleResponses = await Promise.all(stylePromises);

  const relatedStylesData = styleResponses.map((res) => res.data.results[0]);

  dispatch(
    {
      type: 'setDefaultProducts',
      payload: {
        defaultProducts: relatedProductsData,
        rpRatings: ratings,
        relatedProductImages: relatedStylesData,
      },
    },
  );
};

export const getReviews = async (productID, dispatch) => {
  const reviews = axios.get(`/reviews?product_id=${productID}`);
  const ratings = axios.get(`/reviews/meta?product_id=${productID}`);
  const responses = await Promise.all([reviews, ratings]);
  dispatch({
    type: 'setReviews',
    payload: {
      reviews: { ...responses[0].data, results: responses[0].data.results },
      ratings: responses[1].data,
    },
  });
};
