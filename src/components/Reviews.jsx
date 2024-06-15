import React, { useState, useEffect } from 'react';
import { TbTriangleInvertedFilled } from 'react-icons/tb';
import axios from 'axios';
import { FaPlus, FaMagnifyingGlass } from 'react-icons/fa6';
import convertStars from '../lib/convertStars';
import ReviewSummary from './ReviewSummary';
// import RelatedProducts from './RelatedProducts';
// import ProductDetails from './ProductDetails';

function Reviews() {
  const productID = 40387;

  const [reviews, setReviews] = useState({ results: [] });
  const [ratings, setRatings] = useState('');
  const [displayedReviews, setDisplayedReviews] = useState(2);
  const [filters, setFilters] = useState([]);
  const [currentView, setCurrentView] = useState([]);
  const [numReviews, setNumReviews] = useState(0);
  const [sizeFeedback, setSizeFeedback] = useState('');
  // update: useContext

  useEffect(() => {
    axios.get(`/reviews?product_id=${productID}`)
      .then((response) => {
        setReviews({ ...response.data, results: response.data.results }); // update
        setCurrentView(response.data.results);
        setNumReviews(response.data.results.length);
      })
      .catch((err) => {
        console.error('error getting data', err);
      });
    axios.get(`/reviews/meta?product_id=${productID}`)
      .then((response) => {
        setRatings(response.data);
        const productFeatures = ratings.characteristics.map((feature) => feature.Comfort.id);
        setSizeFeedback(productFeatures);
      })
      .catch((err) => {
        console.error('error getting data', err);
      });
  }, [productID]);

  useEffect(() => {
    if (filters.length === 0) {
      setCurrentView(reviews.results?.slice(0, displayedReviews));
    } else {
      const filteredReviews = reviews.results?.filter((review) => filters.includes(review.rating));
      setCurrentView(filteredReviews.slice(0, displayedReviews));
    }
  }, [filters, displayedReviews, reviews]);

  const toggleSearch = (rating) => {
    const newFilters = filters.includes(rating)
      ? filters.filter((filter) => filter !== rating)
      : [...filters, rating];
    setFilters(newFilters);
  };

  console.log(ratings.characteristics);
  console.log(sizeFeedback);

  const hasMoreReviews = displayedReviews < reviews.results?.length;
  const addReviews = () => { setDisplayedReviews(displayedReviews + 2); };

  const getTotalReviews = (star) => (reviews.results?.filter((review) => review.rating === star).length);
  const totalReviews = reviews.results?.length;

  const starTotal = 5;// placeholder
  const featureAvg = ((starTotal - 1) * 25); // 1 star = 0%
  console.log(featureAvg);

  const selectionRating = {
    position: 'absolute',
    left: `${featureAvg}%`,
    bottom: '40%',
  };

  let starRatings;
  if (ratings) {
    starRatings = convertStars(ratings);
  }
  console.log(starRatings);
  return (
    <div id="reviews" value="allReviews" className="flex flex-row-reverse justify-between w-full gap-6  text-neutral-600 pb-12">

      {reviews
        ? (
          <div value="individualReviews" className="flex flex-col flex-auto w-1/2 pl-4  text-neutral-600">
            <span className="flex flex-row pt-5 text-lg font-semibold">
              {`${numReviews} reviews, sorted by`}
              <select className="underline ">
                <option onClick="" value="relevance"> relevance</option>
                <option onClick="" value="newest"> newest</option>
                <option onClick="" value="helpful"> helpful</option>
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
            <div className="grow text-base text-neutral-600">
              {[5, 4, 3, 2, 1].map((star) => (
                <p className="flex flex-row hover:underline pb-2 text-sm">
                  <button key={star} onClick={() => toggleSearch(star)}>{`${star} star`}</button>
                  <progress className="pl-2" value={getTotalReviews(star)} max={totalReviews} />
                  <p>{`${getTotalReviews(star)} review(s)`}</p>
                </p>
              ))}
              <div className="pb-6 pt-1 flex flex-col w-full">
                <h4 className="text-sm">Size</h4>
                <div style={{ position: 'relative' }} className="flex flex-row pb-2  w-full">
                  <span className="pr-2" style={selectionRating}><TbTriangleInvertedFilled className="text-sm" /></span>
                  {/* 10% to 30% -- chaange to grid */}
                </div>
                <progress className="w-full h-2" value={0} />
                <div className="mb-1 flex items-center w-full justify-between gap-2 text-xs font-light">
                  <p className="">Too Small</p>
                  <p>Perfect</p>
                  <p>Too Large</p>
                </div>
              </div>
              <h4 className="text-sm">Comfort</h4>
              <div className="pb-6 pt-1 flex flex-col">
                <div className="">
                  <span className="flex flex-row" style={{ position: 'absolute', left: '70%' }}><TbTriangleInvertedFilled className="flex self-center text-sm" /></span>

                </div>
                <progress className="w-full h-2" value={0} />
                <div className="mb-1 flex items-center w-full justify-between gap-2 text-xs font-light">
                  <p className="">Too Small</p>
                  <p>Perfect</p>
                  <p>Too Large</p>
                </div>
              </div>
            </div>
          </section>
        )
        : null}
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
