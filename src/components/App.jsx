import React from 'react';
import '../styles.css';
import ProductDetails from './ProductDetails';
import RelatedProducts from './RelatedProducts';
import Reviews from './Reviews';

function ReviewPosts({ reviews }) {
  console.log(reviews.results);

  return (
    <div className="review-container">
      {reviews.results?.map((review) => (
        <div key={review.results?.review_id}>
          <span className="starRating">
            <p className="starsRated">{'*'.repeat(review.rating)}</p>
            {/* <p className="starsUnrated">{'*'.repeat(5 - review.rating)}</p> */}
          </span>
          <p className="reviewer">
            {`${review.reviewer_name}    ${review.date.slice(0, 10)}`}
            {/* {review.date.slice(0, 10)} */}
          </p>
          <h2 className="reviewTitle">{review.summary}</h2>
          <p className="reviewBody">{review.body}</p>
        </div>
      ))}
      <p className="isHelpful">
        Helpful?
        <a href="/reviews">Yes      </a>
        <a href="/reviews">(10)  |</a>
        <a href="/reviews">Report </a>
      </p>
    </div>
  );
}

export default Reviews;
