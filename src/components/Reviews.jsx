import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../styles.css';
// import RelatedProducts from './RelatedProducts';
// import ProductDetails from './ProductDetails';
// import Reviews from './Reviews';

function Reviews() {
  // const url = '/reviews?product_id=40344';
  const url = `/reviews?product_id=403${Math.floor(Math.random() * 99)}`;
  // random url, for testing different reviews

  const [reviews, setReviews] = useState('');
  // will swap out with context

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
    <div className=" pl-5 pt-5 flex flex-col  divide-y w-1/2">
      {reviews.results?.map((review) => (
        <div key={review.results?.review_id}>
          <span className="flex flex-row justify-between">
            <span className="pb-2">
              <p className="flex-none">
                {`${'🌝'.repeat(review.rating)}
                  ${'🌚'.repeat(5 - review.rating)}`}
              </p>
            </span>
            <p className="font-light text-sm text-gray-400">
              {`${review.reviewer_name} ${review.date.slice(5, 10)} ${review.date.slice(0, 4)}`}
            </p>
          </span>
          <h2 className="font-semibold text-lg truncate...">{review.summary}</h2>
          <div className="pb-5 font-extralight">{review.body}</div>
        </div>
      ))}
      <span className="text-sm text-gray-600 font-light">
        Helpful?
        <a className="divide-x text-sm no-underline hover:underline" href="/reviews">     Yes   </a>
        <a className="text-xs" href="/reviews">(10)  |  </a>
        <a href="/">   Report </a>
      </span>
    </div>
  );
}

export default Reviews;
