import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaMagnifyingGlass } from 'react-icons/fa6';
import convertStars from '../lib/convertStars';
// import RelatedProducts from './RelatedProducts';
// import ProductDetails from './ProductDetails';

function Reviews() {
  const productID = 40387;

  const url = `/reviews?product_id=${productID}`;
  const reviewUrl = `/reviews/meta?product_id=${productID}`;
  //  update: promise.all
  const [reviews, setReviews] = useState({ results: [] });
  const [ratings, setRatings] = useState('');
  const [displayedReviews, setDisplayedReviews] = useState(2);
  const [filter, setFilter] = useState(3);
  const [currentView, setCurrentView] = useState([]);
  const [numReviews, setNumReviews] = useState(0);
  // update: useContext

  const hasMoreReviews = displayedReviews < reviews.results?.length;
  const addReviews = () => { setDisplayedReviews(displayedReviews + 2); };

  const getTotalReviews = (star) => (reviews.results?.filter((review) => review.rating === star).length);
  const totalReviews = reviews.results?.length;

  const getReviews = () => {
    axios.get(url)
      .then((response) => {
        setReviews({ ...response.data, results: response.data.results }); // update
      })
      .catch((err) => {
        console.error('error getting data', err);
      });
  };
  useEffect(() => {
    getReviews();
  }, [productID]);

  useEffect(() => {
    const filteredReviews = reviews.results?.filter((review) => (
      filter ? review.rating === filter : true)).slice(0, displayedReviews); // if filter, return matches, else return whole arr
    setCurrentView(filteredReviews);
    setNumReviews(filteredReviews.length);
  }, [filter, reviews, displayedReviews]);

  const getRatings = () => {
    axios.get(reviewUrl)
      .then((response) => {
        setRatings(response.data);
      })
      .catch((err) => {
        console.error('error getting data', err);
      });
  };

  useEffect(() => {
    getRatings();
  }, [productID]);

  const starTotal = 4;// update: hard coded

  return (
    <div id="reviews" value="allReviews" className="flex flex-row-reverse justify-between w-full gap-6  text-neutral-600 pb-12">

      {reviews
        ? (
          <div value="individualReviews" className="flex flex-col flex-auto w-1/2 pl-4  text-neutral-600">
            <span className="flex flex-row pt-5 text-lg font-semibold">
              {`${numReviews} reviews, sorted by`}
              <select className="underline ">
                <option value="relevance"> relevance</option>
                <option value="newest"> newest</option>
                <option value="helpful"> helpful</option>
              </select>
            </span>
            <ul className="pl-5 pt-2">
              {currentView.map((review) => (
                <li>
                  <ReviewPosts
                    key={review.review_id}
                    review={review}
                  />
                </li>
              ))}
            </ul>
            <div className="flex flex-row gap-4 justify-start">
              {hasMoreReviews
                ? (
                  <div className="font-bold text-lg ">
                    <button className="form-input" onClick={addReviews}> MORE REVIEWS</button>
                  </div>
                )
                : null}
              <div className="font-bold text-lg ">
                <button className="form-input" onClick={addReviews}> ADD REVIEW</button>
              </div>
            </div>
          </div>
        )
        : null}

      {/* ReviewSummary.jsx */}
      {ratings
        ? (
          <section className="flex flex-col self-start pr-10 pt-4 pb-20">
            <p className=" text-lg text-gray-600 font-light pb-2">RATINGS & REVIEWS</p>
            <div className="flex flex-row pb-4">
              <h2 className="font-bold text-4xl">{starTotal}</h2>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <input key={rating} type="radio" className="mask mask-star-2 bg-primary" disabled checked={Math.round(starTotal === rating)} />
                ))}
              </div>
            </div>
            <div className="grow text-base text-neutral-600 pb-4">
              {[5, 4, 3, 2, 1].map((star) => (
                <p className="flex flex-row hover:underline">
                  <button key={star} onClick={() => setFilter(star)}>{`${star} star`}</button>
                  <progress className="pl-2" value={getTotalReviews(star)} max={totalReviews} />
                  <p>{`${getTotalReviews(star)} review(s)`}</p>
                </p>
              ))}

              <div className="pb-4 pt-4 flex flex-col">
                <h4 className="text-sm">Size</h4>
                <h4 className="flex self-center text-sm">🔽</h4>
                <progress className="w-full" value={0} />
                <span className="mb-1 flex items-center justify-between gap-2 text-xs font-light">
                  <p>Too Small</p>
                  <p>Perfect</p>
                  <p>Too Large</p>
                </span>
              </div>
              <div className="">
                <h4 className="text-sm">Comfort</h4>
                <h4 className="text-sm">🔽</h4>
                <progress className="w-full" value={0} />
                <span className="mb-1 flex items-center justify-between gap-2 text-xs font-light">
                  <p>Too Small</p>
                  <p>Perfect</p>
                  <p>Too Large</p>
                </span>
              </div>
            </div>
          </section>
        )
        : null}
    </div>
  );
}

function ReviewPosts({ review }) {
  return (
    <div className=" pt-2 pb-2 flex flex-col divide-y">
      <div className="pt-8">
        <span className="flex flex-row justify-between">
          <span className="pb-2">
            <div className="rating">
              {[1, 2, 3, 4, 5].map((rating) => (
                <input key={rating} type="radio" className="mask mask-star-2 bg-primary" disabled checked={Math.round(review.rating === rating)} />
              ))}
            </div>
          </span>
          <p className="font-light text-sm text-gray-400">
            {`${review.reviewer_name} ${review.date.slice(5, 10)} ${review.date.slice(0, 4)}`}
          </p>
        </span>
        <h2 className="font-semibold text-lg truncate...">{review.summary}</h2>
        <div className="pb-5 font-extalight">{review.body}</div>
        <div>
          {review.response && (
            <div className="bg-gray-300 pb-4">
              <p>Response from seller:</p>
                {review.response}
            </div>
          )}
        </div>
        <span className="text-sm text-gray-600 font-light">
          Helpful?
          {/* update to match Q&A */}
          <a className="divide-x text-sm no-underline hover:underline" href="/reviews">     Yes   </a>
          <a className="text-xs" href="/reviews">(10)  |  </a>
          <a href="/">   Report </a>
        </span>
      </div>
    </div>
  );
}

export default Reviews;
