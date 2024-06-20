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

  const [avgRatings, setAvgRatings] = useState('');
  const [displayedReviews, setDisplayedReviews] = useState(2);
  const [filters, setFilters] = useState([]);
  const [currentView, setCurrentView] = useState([]);
  const [sortMethod, setSortMethod] = useState('relevance');
  const [newForm, setNewForm] = useState(false);

  const {
    store: { reviews }, store: { ratings }, store: { rating }, showModal,
  } = useContext(AppContext);

  const handleSortMethod = (sortType) => {
    console.log(currentView);
    console.log(displayedReviews);
    const filteredReviews = filters.length === 0 ? reviews.results : reviews.results?.filter((review) => filters.includes(review.rating));
    // const filteredReviews = filters.length === 0 ? reviews.results : reviews.results?.filter((review) => filters.includes(review.rating));
    // setCurrentView(filteredReviews.slice(0, displayedReviews));
    if (sortType === 'newest') {
      filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortType === 'helpfulness') {
      filteredReviews.sort((a, b) => a.helpfulness - b.helpfulness);
    } else {
      filteredReviews.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        const dateMatch = dateA - dateB;

        if (dateMatch !== 0) {
          return dateMatch;
        }
        return b.helpfulness - a.helpfulness;
      });
    }
    ;
    setCurrentView(filteredReviews);
  };

  useEffect(() => {
    if (reviews) {
      handleSortMethod(sortMethod);
    }
  }, [filters, displayedReviews, sortMethod, reviews, currentView]);

  const hasMoreReviews = reviews ? displayedReviews < reviews.results?.length : false;

  const addReviews = () => { setDisplayedReviews(displayedReviews + 2); };

  return (
    <div id="reviews" value="allReviews" className="text-base-color flex flex-row-reverse justify-between w-full gap-6">
      {reviews
        ? (
          <div value="individualReviews" className="flex flex-col flex-auto w-1/2 pl-4 ">
            <span className="flex flex-row pt-5 text-lg font-semibold">
              {`${reviews.results?.length} reviews, sorted by`}
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
                <button className="form-input flex flex-row" onClick={() => showModal(<NewReview ratings={ratings} reviews={reviews} />)}>
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

          <ReviewSummary
            className="text-base-content"
            key={ratings.product_id}
            ratings={ratings}
            reviews={reviews}
            avgRatings={rating.average}
            filters={filters}
            setFilters={setFilters}
          />

        ) : null}
    </div>
  );
}
// ReviewPosts.jsx
function ReviewPosts({ review }) {
  const [showChars, setShowChars] = useState(250);
  const {
    dispatch, store: { helpfulReviews }, showModal, hideModal,
  } = useContext(AppContext);

  const reviewDate = new Date(review.date);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const handleShowChars = (e) => {
    e.preventDefault();
    setShowChars(e.target.value.length);
  };
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
    <div className=" pt-2 pb-2 flex flex-col">
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
        <h2 className="font-bold text-lg ">{review.summary}</h2>
        <div className="pb-5 font-extalight">{review.body.split('').slice(0, showChars)}</div>
        {review.body.split('').length > showChars
            && <button onClick={(e) => setShowChars(review.body.split('').length)}> Show More...</button> }
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
            &&
          // closeUp ? (
              review.photos.map((photo) => (
                <img
                  key={photo.id}
                  style={{
                    border: '1px solid', padding: '5px', height: '75px', width: '75px',
                  }}
                  onClick={() => showModal()}
                  src={photo.url}
                  alt=""
                />
              // ))) : (
              // review.photos.map((photo) => (
              //   <img
              //     key={photo.id}
              //     style={{
              //       padding: '5px', height: '750px', width: '750px',
              //     }}
                //   onClick={() => hideModal()}
                //   src={photo.url}
                //   alt=""
                // />
              ))}

          {/* <button className="absolute right-0 top-0 text-black hover:bg-slate-300" onClick={hideModal}>
            <IoClose size={32} />
            </button> */}
          {/* <button className="text-xl" onClick={hideModal}>
            X
            </button> */}
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

export default Reviews;
