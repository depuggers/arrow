import React, {
  useState, useEffect, useContext,
} from 'react';
import axios from 'axios';
import { FaPlus, FaMagnifyingGlass } from 'react-icons/fa6';
import calculateRating from '../lib/calculateRating';
import ReviewSummary from './ReviewSummary';
import NewReview from './NewReview';
import AppContext from '../context/AppContext';
import Helpful from './Helpful';

function Reviews() {
  const productID = 40344;

  // const [state, dispatch] = useReducer(reducer, { results: [] });
  // const [reviews, setReviews] = useState({ results: [] });

  const [avgRatings, setAvgRatings] = useState('');
  const [displayedReviews, setDisplayedReviews] = useState(2);
  const [filters, setFilters] = useState([]);
  const [currentView, setCurrentView] = useState([]);
  const [sortMethod, setSortMethod] = useState('relevance');
  const [newForm, setNewForm] = useState(false);

  const { store: { reviews }, store: { ratings }, store: { rating }, showModal } = useContext(AppContext);
  // const [store, dispatch]

  useEffect(() => {
    if (reviews) {
      if (filters.length === 0) {
        setCurrentView(reviews.results?.slice(0, displayedReviews));
      } else {
        const filteredReviews = reviews.results?.filter((review) => filters.includes(review.rating));
        setCurrentView(filteredReviews.slice(0, displayedReviews));
      }
    }
  }, [filters, displayedReviews, reviews]);

  const handleSortMethod = (sortType) => {
    const sortByHelpfulness = () => {
      setCurrentView([...currentView.sort((a, b) => a.helpfulness - b.helpfulness)]);
    };

    const sortByDate = () => {
      setCurrentView(currentView.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        console.log(sortType, dateA, dateB);
        if (dateA < dateB) {
          return -1;
        } if (dateB < dateA) {
          return 1;
        }
        return 0;
      }));
    };

    // const sortByRelevance = () => {
    // };

    if (sortType === 'newest') {
      sortByDate();
    } else if (sortType === 'helpfulness') {
      sortByHelpfulness();
    } // else {
    //   sortByRelevance();
    // }
  };

  useEffect(() => {
    if (reviews && sortMethod === 'newest') {
      handleSortMethod('newest');
    } else if (reviews && sortMethod === 'helpfulness') {
      handleSortMethod('helpfulness');
    }
  }, [reviews]);

  let hasMoreReviews;
  if (reviews) {
    hasMoreReviews = displayedReviews < reviews.results?.length;
  }
  const addReviews = () => { setDisplayedReviews(displayedReviews + 2); };

  return (
    <div id="reviews" value="allReviews" className="flex flex-row-reverse justify-between w-full gap-6  text-neutral-600 pb-12">

      {reviews
        ? (
          <div value="individualReviews" className="flex flex-col flex-auto w-1/2 pl-4  text-neutral-600">
            <span className="flex flex-row pt-5 text-lg font-semibold">
              {`${reviews.results?.length} reviews, sorted by`}
              <select
                className="underline"
                onChange={(e) => { handleSortMethod(e.target.value); }}
              >
                {['Relevance', 'Newest', 'Helpfulness'].map((sortType, index) => (
                  <option key={index} value={sortType.toLowerCase()}>{sortType}</option>
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
              <div className="font-bold text-lg">
                <button className="form-input flex flex-row" onClick={() => showModal(<NewReview />)}>
                  ADD REVIEW
                  <FaPlus size={24} />
                </button>
              </div>
            </div>
          </div>
        )
        : null}

      {reviews && ratings
        ? (
          <div>
            <ReviewSummary
              key={ratings.product_id}
              ratings={ratings}
              reviews={reviews}
              avgRatings={rating.average}
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

  const [reported, setReported] = useState(true);
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
  console.log(review);
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
          <p className="font-light text-sm text-neutral-500">
            {`${review.reviewer_name}, ${monthNames[reviewDate.getMonth()]} ${reviewDate.getDate()}, ${reviewDate.getFullYear()} `}
          </p>
        </span>
        <h2 className="font-bold text-lg truncate...">{review.summary}</h2>
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

          <Helpful helpfulCount={review.helpfulness} helpfulAction={() => markReviewHelpful(review.review_id)}>
            <button>{reported ? 'Report' : 'Reported'}</button>
          </Helpful>

        </span>
      </div>
    </div>
  );
}

export default Reviews;
