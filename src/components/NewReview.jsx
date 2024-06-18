import React, { useContext } from 'react';

import ReviewSummary from './ReviewSummary';
import AppContext from '../context/AppContext';
import StarRating from './StarRating';

function NewReview() {
  const {
    store: { ratings }, store: { product }, store: { reviews }, hideModal,
  } = useContext(AppContext);

  const placeholderRating = 1;
  return (
    <div>
      <div className="w-1/2 border-2">
        <h1>Write Your Review</h1>
        <h3>{`About the ${product.name}`}</h3>
        <div className="rating">
          Overall Rating
          {[1, 2, 3, 4, 5].map((rating) => (
            <input
              key={rating}
              type="radio"
              className="mask mask-star-2 bg-primary"
              disabled
              checked={Math.round(placeholderRating === rating)}
            />
          ))}
        </div>
        {placeholderRating && <h1>poor</h1>}
        <div className="rating">
          Do you reccommend this product?
          <input key="yes" label="yes" type="radio" />
          <input key="no" label="no" type="radio" />
        </div>
        <div className="rating flex flex-row">
          Product characteristics
          {[1, 2, 3, 4, 5].map((selection) => (
            <input
              key={selection}
              type="radio"
              className="mask mask-star-2 bg-primary"
              disabled
              checked={Math.round(placeholderRating === selection)}
            />
          ))}
        </div>
        <form className="pb-5">
          <h1> Review Summary</h1>
          <div>
            <textarea className="border-2" name="reviewSummary" id="reviewSumary" />
          </div>
          <h1> Review Body</h1>
          <div>
            <textarea className="border-2" name="reviewBody" id="reviewBody" />
          </div>
          <h1> Nickname</h1>
          <div>
            <textarea className="border-2" name="reviewBody" id="reviewBody" />
          </div>
          <h1> Email</h1>
          <div>
            <textarea className="border-2" name="reviewBody" id="reviewBody" placeholder="Example: jackson11@email.com" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewReview;
