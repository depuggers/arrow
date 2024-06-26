import React from 'react';
import StarRating from './StarRating';
import { ProductCharacteristics } from './ProductCharacteristics';

function ReviewSummary({
  ratings, reviews, avgRatings, filters, setFilters,
}) {
  const getTotalReviews = (star) => (reviews.results?.filter((review) => review.rating === star).length);
  const totalReviews = reviews.results?.length;
  const roundedAvg = Math.round(avgRatings * 10) / 10;

  const toggleSearch = (rating) => {
    const newFilters = filters.includes(rating)
      ? filters.filter((filter) => filter !== rating)
      : [...filters, rating];
    setFilters(newFilters);
  };

  return (

    <section className="text-base-content flex flex-col w-full md:w-1/3 self-start pt-4 md:pb-8  ">
      <p className=" text-lg font-light pb-2">RATINGS & REVIEWS</p>
      <div className="flex flex-row pb-4 gap-4 items-center">
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
      <h2 className="flex flex-row justify-center text-lg font-semibold pb-2">RATING BREAKDOWN</h2>
      <div>
        {filters.length > 0
          ? (
            <div>
              <p className="flex flex-row justify-center text-lg font-semibold pb-2">
                Current filters: |{`${filters} star | `}
              </p>
              <p className="flex flex-row justify-center text-lg font-semibold pb-2">
                <button className="justify-center text-base-content font-semibold pb-2 form-input" onClick={() => setFilters([])}>Clear Filters</button>
              </p>

            </div>
          ) : null}
      </div>
      <div className="flex flex-row font-bold text-sm justify-between">
        <p />
      </div>
      <div className="grow text-base text-base-content w-full">
        {[5, 4, 3, 2, 1].map((star) => (
          <span key={star} className="w-full flex flex-row md:pb-2 text-base-content text-lg">
            <button className="hover:underline" onClick={() => toggleSearch(star)}>{`${star} stars`}</button>
            <progress className="pl-2 pt-1 pb-2 h-9 text-sm grow   [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-green-400 [&::-moz-progress-bar]:bg-green-400" value={getTotalReviews(star)} max={totalReviews} />
            <p className="pl-2">{`${getTotalReviews(star)} review`}</p>
            <p>
              {getTotalReviews(star) !== 1 && 's'}
            </p>
          </span>
        ))}
        <div className="pt-10" />
      </div>
      <ProductCharacteristics
        reviews={reviews}
        ratings={ratings}
      />
    </section>
  );
}

export default ReviewSummary;
