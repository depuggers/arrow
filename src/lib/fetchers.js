import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import calculateRating from './calculateRating';

const axislow = rateLimit(axios.create(), { maxRPS: 12 });

export const getDetails = async (productID, dispatch) => {
  try {
    const res = await axislow.get(`/products/${productID}`);
    dispatch({
      type: 'setProductDetails',
      payload: {
        product: res.data,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getStyles = async (productID, dispatch) => {
  try {
    const res = await axislow.get(`/products/${productID}/styles`);
    dispatch({
      type: 'setProductDetails',
      payload: {
        styles: res.data.results,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getQuestions = async (productID, dispatch) => {
  try {
    const res = await axislow.get(`/qa/questions?product_id=${productID}&count=3333`);
    dispatch({
      type: 'setProductDetails',
      payload: {
        questions: res.data.results,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getRating = async (productID, dispatch) => {
  try {
    const res = await axislow.get(`/reviews/meta?product_id=${productID}`);
    dispatch({
      type: 'setProductDetails',
      payload: {
        rating: calculateRating(res.data),
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getRelatedProducts = async (productID, dispatch) => {
  const response = await axislow.get(`/products/${productID}/related`);
  const relatedProductIds = response.data;

  const productPromises = relatedProductIds.map((item) => axislow.get(`/products/${item}`));
  const ratingPromises = relatedProductIds.map((item) => axislow.get(`/reviews/meta?product_id=${item}`));

  const productResponses = await Promise.all(productPromises);
  const ratingResponses = await Promise.all(ratingPromises);

  const relatedProductsData = productResponses.map((res) => res.data);

  const ratings = ratingResponses.map((res) => calculateRating(res.data));

  const stylePromises = relatedProductsData.map((product) => axislow.get(`/products/${product.id}/styles`));
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
  const reviews = axislow.get(`/reviews?product_id=${productID}`);
  const ratings = axislow.get(`/reviews/meta?product_id=${productID}`);
  const responses = await Promise.all([reviews, ratings]);
  dispatch({
    type: 'setReviews',
    payload: {
      reviews: { ...responses[0].data, results: responses[0].data.results },
      ratings: responses[1].data,
    },
  });
};
