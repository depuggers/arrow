import React from 'react';
import { TbTriangleInvertedFilled } from 'react-icons/tb';
import StarRating from './StarRating';
import ProductCharacteristics from './ProductCharacteristics';

function ReviewSummary({
  ratings, reviews, avgRatings, filters, setFilters,
}) {
  const getTotalReviews = (star) => (reviews.results?.filter((review) => review.rating === star).length);
  const totalReviews = reviews.results?.length;
  const productChars = ratings.characteristics;
  const relevantChars = Object.keys(productChars);

  const roundedAvg = Math.round(avgRatings * 10) / 10;
console.log(productChars)
  const getFeatureData = (feature) => {
    // const featureData = `${productChars}.${feature}.value`;
    const featureData = productChars[feature].value || 0;
    const featureAvg = ((featureData) * 20);

    const selectionRating = {
      position: 'absolute',
      left: `${featureAvg}%`,
      bottom: '10%',
    };
    return selectionRating;
  };

  const toggleSearch = (rating) => {
    const newFilters = filters.includes(rating)
      ? filters.filter((filter) => filter !== rating)
      : [...filters, rating];
    setFilters(newFilters);
  };

  return (

    <section className="text-base-content flex flex-col self-start pr-10 pt-4 pb-20 w-1/4">
      <p className=" text-lg font-light pb-2">RATINGS & REVIEWS</p>
      <div className="flex flex-row pb-4">
        <h2 className="font-bold text-4xl">
          {roundedAvg}
        </h2>
        <div className="rating pr-1">
          {ratings
               && (
               <StarRating
                 rating={roundedAvg}
                 size={1.5}
               />
               )}
        </div>
      </div>
      <h2 className="flex flex-row justify-center text-sm font-semibold pb-2">RATING BREAKDOWN</h2>
      <div className="flex flex-row font-bold text-sm justify-between">
        <p />
        {/* <p>#Reviews</p> */}
      </div>
      <div className="grow text-base w-full">
        {[5, 4, 3, 2, 1].map((star) => (
          <span key={star} className="w-full flex flex-row hover:underline pb-2 text-sm">
            <button onClick={() => toggleSearch(star)}>{`${star} stars`}</button>
            <progress className="pl-2 pt-1 text-sm grow" value={getTotalReviews(star)} max={totalReviews} />
            <p>{`${getTotalReviews(star)} review`}</p>
            <p>
              {getTotalReviews(star) !== 1 && 's'}
            </p>
          </span>
        ))}
        <div className="pt-10">
        </div>
      </div>
    </section>
  );
}

export default ReviewSummary;
