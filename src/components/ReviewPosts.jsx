import React, {
  useState, useContext,
} from 'react';
import axios from 'axios';

import AppContext from '../context/AppContext';
import Helpful from './Helpful';
import StarRating from './StarRating';
import missing from '../images/missing.svg?url';

const productID = 40344;



function ReviewPosts({ review }) {
  const [showChars, setShowChars] = useState(250);
  const {
    dispatch, store: { helpfulReviews },
  } = useContext(AppContext);

  const reviewDate = new Date(review.date);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const markReviewHelpful = async (id) => {
    if (!helpfulReviews.includes(id)) {
      const response = await axios.put(`/reviews/${id}/helpful`);
      if (response.status === 204) {
        dispatch({
          type: 'setReviewHelpful', payload: id,
        });
        return true;
      }
      return false;
    }
    return false;
  };

  return (
    <div className=" pt-2 pb-2 flex flex-col">
      <div className="pt-8">
        <span className="flex flex-row justify-between">
          <span className="pb-2">
            <div className="rating">
              <StarRating
                rating={review.rating}
              />
            </div>
          </span>
          <p className="font-light text-sm text-neutral-500">
            {`${review.reviewer_name}, ${monthNames[reviewDate.getMonth()]} ${reviewDate.getDate()}, ${reviewDate.getFullYear()} `}
          </p>
        </span>
        <h2 className="font-bold text-lg ">{review.summary}</h2>
        <div className="pb-5 font-extalight">{review.body.split('').slice(0, showChars)}</div>
        {review.body.split('').length > showChars
            && <button onClick={() => setShowChars(review.body.split('').length)}> Show More...</button> }
        <div>
          {review.response && (
            <div className="bg-gray-300 pb-4">
              <p>Response from seller:</p>
                {review.response}
            </div>
          )}
        </div>
        <span className="flex flex-row">
          {(review.photos.length > 0 && review.photos.length <= 5)
            && review.photos.map((photo) => (
              <img
                key={photo.id}
                style={{
                  border: '1px solid', padding: '5px', height: '75px', width: '75px',
                }}
                src={photo.url.startsWith('http') ? photo.url : missing}
                alt=""
              />
            ))}
        </span>
        <span className="text-sm text-gray-600 font-light pt-4">
          <Helpful helpfulCount={review.helpfulness} helpfulAction={() => markReviewHelpful(review.review_id)}>
            <button>No</button>
          </Helpful>
        </span>
      </div>
    </div>
  );
}

export default ReviewPosts;
