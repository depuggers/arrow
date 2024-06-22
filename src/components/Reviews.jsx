import React, {
  useState, useEffect, useContext,
} from 'react';

import { FaPlus } from 'react-icons/fa6';
import ReviewSummary from './ReviewSummary';
import ReviewPosts from './ReviewPosts';
import NewReview from './NewReview';
import AppContext from '../context/AppContext';

function Reviews() {
  const [displayedReviews, setDisplayedReviews] = useState(2);
  const [filters, setFilters] = useState([]);
  const [currentView, setCurrentView] = useState([]);
  const [sortMethod, setSortMethod] = useState('relevance');

  const {
    store: { reviews }, store: { ratings }, store: { rating }, showModal,
  } = useContext(AppContext);

  const handleSortMethod = (sortType) => {
    const sortedReviews = filters.length === 0
      ? reviews.results
      : reviews.results.filter((review) => filters.includes(review.rating));

    if (sortType === 'newest') {
      sortedReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortType === 'helpfulness') {
      sortedReviews.sort((a, b) => b.helpfulness - a.helpfulness);
    } else {
      sortedReviews.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        const dateDiff = dateB - dateA;
        if (dateDiff !== 0) {
          return dateDiff;
        }
        return b.helpfulness - a.helpfulness;
      });
    }
    setCurrentView(sortedReviews);
  };
  useEffect(() => {
    if (reviews) {
      handleSortMethod(sortMethod);
    }
  }, [reviews, sortMethod, filters, displayedReviews, currentView]);

  const addReviews = () => {
    setDisplayedReviews(displayedReviews + 2);
  };

  const hasMoreReviews = reviews ? displayedReviews < reviews.results.length : false;

  return (
    <div id="reviews" value="allReviews" className="text-base-color flex flex-row-reverse justify-between w-full gap-6">
      {reviews && (
        <div value="individualReviews" className="flex flex-col flex-auto w-1/2 pl-4 ">
          <span className="flex flex-row pt-5 text-lg font-semibold">
            {`${reviews.results.length} reviews, sorted by`}
            <select
              className="underline bg-transparent text-base-content"
              onChange={(e) => { handleSortMethod(e.target.value); }}
            >
              {['Relevance', 'Newest', 'Helpfulness'].map((sortType, index) => (
                <option key={index} value={sortType.toLowerCase()}>{sortType}</option>
              ))}
            </select>
          </span>
          <ul className="pl-5 pt-2 divide-y">
            {currentView.slice(0, displayedReviews).map((review) => (
              <li key={review.review_id}>
                <ReviewPosts
                  review={review}
                />
              </li>
            ))}
          </ul>
          <div className="flex flex-row gap-4">
            {hasMoreReviews && (
              <div className="font-bold text-lg ">
                <button className="form-input" onClick={addReviews}> MORE REVIEWS</button>
              </div>
            )}
            <div className="font-bold text-lg">
              <button className="form-input flex flex-row" onClick={() => showModal(<NewReview ratings={ratings} reviews={reviews} />)}>
                ADD REVIEW
                <FaPlus size={24} />
              </button>
            </div>
          </div>
        </div>
      )}

      {reviews && ratings && (
        <ReviewSummary
          className="text-base-content"
          key={ratings.product_id}
          ratings={ratings}
          reviews={reviews}
          avgRatings={rating.average}
          filters={filters}
          setFilters={setFilters}
        />
      )}
    </div>
  );
}

export default Reviews;
