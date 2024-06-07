import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';
// import RelatedProducts from './RelatedProducts';
// import ProductDetails from './ProductDetails';
// import Reviews from './Reviews';

function Reviews() {
  const url = '/reviews?product_id=40344';
  // swap out with context tomorrow
  const [reviews, setReviews] = useState('');

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((err) => {
        console.error('error getting data', err);
      });
  }, []);

  const singleReview = { ...reviews, results: reviews.results?.slice(0, 1) };
  return (
    <div>
      {/* <ProductDetails />
      <RelatedProducts /> */}
      {/* <Reviews /> */}

      <ul>
        <ReviewPosts
          // reviews={reviews}
          reviews={singleReview} // render single review while testing code
        />
      </ul>
    </div>
  );
}

function ReviewPosts({ reviews }) {
  return (
    <div className="review-container">
      {reviews.results?.map((review) => (
        <div key={review.results?.review_id}>
          <p className="starRating">
            <p className="starsRated">{'*'.repeat(review.rating)}</p>
            <p className="starsUnrated">{'*'.repeat(5 - review.rating)}</p>
          </p>
          <p className="reviewer">
            {`${review.reviewer_name}    ${review.date.slice(0, 10)}`}
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
