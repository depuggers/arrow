import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { FaPlus, FaMagnifyingGlass } from 'react-icons/fa6';
import convertStars from '../lib/convertStars';
// import RelatedProducts from './RelatedProducts';
// import ProductDetails from './ProductDetails';

function Reviews() {
  const productID = 40387;
  const url = `/reviews?product_id=${productID}`;
  const reviewUrl = `/reviews/meta?product_id=${productID}`;
  // put both in promise.all to ensure both are complete
  const [reviews, setReviews] = useState('');
  const [ratings, setRatings] = useState('');
  // will swap out with context
  const someReviews = { ...reviews, results: reviews.results?.slice(0, 3) };
  // const allReviews = { ...reviews, results: reviews.results?.slice() };
  const totalReviews = 50;
  // const allReviews = { ...reviews, results: reviews.results?.slice() };

  const getReviews = () => {
    axios.get(url)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((err) => {
        console.error('error getting data', err);
      });
  };

  useEffect(() => {
    getReviews();
  }, [productID]);

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

  let starRatings;
  if (ratings) {
    starRatings = convertStars(ratings);
  }

  return (
    <div id="reviews" className="flex flex-row-reverse justify-between w-full gap-6  text-neutral-600">
      {/* review container */}
      {reviews

        ? (
          <div className="flex flex-col flex-auto w-1/2 pl-4  text-neutral-600">
            <div className="relative">
              {/* <input type="search" name="qna_search" onChange={(e) => setFilter(e.target.value)} placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." className="form-input w-full" />
            <FaMagnifyingGlass size={20} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" /> */}
            </div>
            {/* <form className="pt-2 pb-2">
            <input className="border-2 text-xl rounded-l border-r-0" type="text" placeholder="Search by keyword" />
            <button className="border-2 rounded-r text-xl border-l-0 bg-slate-200" type="submit">🔍</button>
          </form> */}
            <ul>
              <ReviewPosts
              // reviews={allReviews}
                reviews={someReviews} // render single review while testing code
                className="pl-5 pt-2"
              />
            </ul>
          </div>
        )
        : null}

      {/* ReviewSummary.jsx */}
      {ratings
        ? (
          <section className="flex flex-col self-start pr-20 pt-4">
            <p className=" text-lg text-gray-600 font-light pb-2">RATINGS & REVIEWS</p>
            <div className="flex flex-row pb-4">
              <p className="font-bold text-4xl"> 4</p>
              <div className="rating">
                <input type="radio" className="mask mask-star-2 bg-primary" disabled />
                <input type="radio" className="mask mask-star-2 bg-primary" disabled />
                <input type="radio" className="mask mask-star-2 bg-primary" disabled />
                <input type="radio" className="mask mask-star-2 bg-primary" disabled checked />
                <input type="radio" className="mask mask-star-2 bg-primary" disabled />
              </div>
            </div>
            <div className="grow text-base text-neutral-600 pb-4">
              <p className="hover:underline">
                5 star
                <progress className="pl-2" value={starRatings.stars5} max={totalReviews} />
              </p>
              <p className="hover:underline">
                4 star
                <progress className="pl-2" value={starRatings.stars4} max={totalReviews} />
              </p>
              <p className="hover:underline">
                3 star
                <progress className="pl-2" value={starRatings.stars3} max={totalReviews} />
              </p>
              <p className="hover:underline">
                2 star
                <progress className="pl-2" value={starRatings.stars2} max={totalReviews} />
              </p>
              <p className="hover:underline">
                1 star
                <progress className="pl-2" value={starRatings.stars1} max={totalReviews} />
              </p>

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

function ReviewPosts({ reviews }) {
  return (

    <div className=" pt-2 pb-2 flex flex-col divide-y">
      <span className="flex flex-row pt-5 text-lg font-semibold">
        3 reviews, sorted by
        <select className="underline ">
          <option value="relevance"> relevance</option>
          <option value="newest"> newest</option>
          <option value="helpful"> helpful</option>
        </select>
      </span>
      {reviews.results?.map((review) => (
        <div className="pt-8" key={review.results?.review_id}>
          <span className="flex flex-row justify-between">
            <span className="pb-2">

              <div className="rating">
                <input type="radio" className="mask mask-star-2 bg-primary" disabled checked={Math.round(review.rating === 1)} />
                <input type="radio" className="mask mask-star-2 bg-primary" disabled checked={Math.round(review.rating === 2)} />
                <input type="radio" className="mask mask-star-2 bg-primary" disabled checked={Math.round(review.rating === 3)} />
                <input type="radio" className="mask mask-star-2 bg-primary" disabled checked={Math.round(review.rating === 4)} />
                <input type="radio" className="mask mask-star-2 bg-primary" disabled checked={Math.round(review.rating === 5)} />
              </div>

            </span>
            <p className="font-light text-sm text-gray-400">
              {`${review.reviewer_name} ${review.date.slice(5, 10)} ${review.date.slice(0, 4)}`}
            </p>
          </span>
          <h2 className="font-semibold text-lg truncate...">{review.summary}</h2>
          <div className="pb-5 font-extralight">{review.body}</div>
          <div>
            {review.response ? (
              <div className="bg-gray-300 pb-4">
                <p>Response from seller:</p>
                {review.response}
              </div>

            ) : (
              null)}
          </div>
          <span className="text-sm text-gray-600 font-light">
            Helpful?
            <a className="divide-x text-sm no-underline hover:underline" href="/reviews">     Yes   </a>
            <a className="text-xs" href="/reviews">(10)  |  </a>
            <a href="/">   Report </a>
          </span>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
