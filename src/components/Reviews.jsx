import React, { useState, useEffect } from 'react';
import { TbTriangleInvertedFilled } from 'react-icons/tb';
import axios from 'axios';
import { FaPlus, FaMagnifyingGlass } from 'react-icons/fa6';
import calculateRating from '../lib/calculateRating';
import ReviewSummary from './ReviewSummary';
// import RelatedProducts from './RelatedProducts';
// import ProductDetails from './ProductDetails';

function Reviews() {
  const productID = 40387;

  const [reviews, setReviews] = useState({ results: [] });
  const [ratings, setRatings] = useState('');
  const [avgRatings, setAvgRatings] = useState('');
  const [displayedReviews, setDisplayedReviews] = useState(4);
  const [filters, setFilters] = useState([]);
  const [currentView, setCurrentView] = useState([]);
  const [numReviews, setNumReviews] = useState(0);
  // useContext

  useEffect(() => {
    try {
      axios.get(`/reviews?product_id=${productID}`)
        .then((response) => {
          setReviews({ ...response.data, results: response.data.results }); // update
          setCurrentView(response.data.results);
          setNumReviews(response.data.results.length);
        });
      axios.get(`/reviews/meta?product_id=${productID}`)
        .then((response) => {
          setRatings(response.data);
          setAvgRatings(calculateRating(response.data));
        });
    } catch (err) {
      console.error('error getting data', err);
    }
  }, [productID]);

  useEffect(() => {
    if (filters.length === 0) {
      setCurrentView(reviews.results?.slice(0, displayedReviews));
    } else {
      const filteredReviews = reviews.results?.filter((review) => filters.includes(review.rating));
      setCurrentView(filteredReviews.slice(0, displayedReviews));
    }
  }, [filters, displayedReviews, reviews]);
  // to async
  const handleSortMethod = (sortType) => {
    const sortByHelpfulness = () => {
      currentView.sort((a, b) => a.helpfulness - b.helpfulness);
    };
    const sortByDate = () => {
      setCurrentView(currentView.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        if (dateA < dateB) {
          return -1;
        } if (dateB < dateA) {
          return 1;
        }
        return 0;
      }));
    };
    if (sortType === 'Newest') {
      sortByDate();
    } else if (sortType === 'Helpfulness') {
      sortByHelpfulness();
    }
  };
  // currentView.sort((a, b) => a.helpfulness - b.helpfulness);
  // ;

  // let starRatings;
  // if (ratings) {
  //   starRatings = convertStars(ratings);
  // }

  const hasMoreReviews = displayedReviews < reviews.results?.length;
  const addReviews = () => { setDisplayedReviews(displayedReviews + 2); };

  console.log(ratings.characteristics);
  console.log(currentView);

  return (
    <div id="reviews" value="allReviews" className="flex flex-row-reverse justify-between w-full gap-6  text-neutral-600 pb-12">

      {reviews
        ? (
          <div value="individualReviews" className="flex flex-col flex-auto w-1/2 pl-4  text-neutral-600">
            <span className="flex flex-row pt-5 text-lg font-semibold">
              {`${numReviews} reviews, sorted by`}
              <select
                className="underline"
                // onChange={ setValue, then  trigger re-render}
                // onChange={sortBy`${value}(${value})`}
                value={currentView}
                onChange={currentView}
              >
                {['Relevance', 'Newest', 'Helpfulness'].map((sortType, index) => (
                  <option key={index}>{sortType}</option>
                ))}
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
            <div className="flex flex-row gap-4">
              {hasMoreReviews
                ? (
                  <div className="font-bold text-lg ">
                    <button className="form-input" onClick={addReviews}> MORE REVIEWS</button>
                  </div>
                )
                : null}
              <div className="font-bold text-lg flex flex-row">
                <button className="form-input flex flex-row gap-1" onClick={() => alert('feature coming soon!')}>
                  ADD REVIEW
                  <FaPlus size={24} />
                </button>
              </div>
            </div>
          </div>
        )
        : null}

      {/* ReviewSummary.jsx */}
      {ratings
        ? (
          <div>
            <ReviewSummary
              key={ratings.product_id}
              ratings={ratings}
              reviews={reviews}
              avgRatings={avgRatings}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        ) : null}
    </div>
  );
}
// ReviewPosts.jsx
function ReviewPosts({ review }) {
  const reviewDate = new Date(review.date);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
            {`${review.reviewer_name}, ${monthNames[reviewDate.getMonth()]} ${reviewDate.getDate()}, ${reviewDate.getFullYear()} `}
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

// const dateSort = () => {
// setCurrentView(currentView.sort((a, b) => a.date - b.date));
// console.log(reviews.results?.map((data) => data.date));// date arr
// };
