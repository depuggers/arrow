import React, { useState } from 'react';
import { TbTriangleInvertedFilled } from 'react-icons/tb';
import axios from 'axios';
import { FaPlus, FaMagnifyingGlass } from 'react-icons/fa6';
import convertStars from '../lib/convertStars';

function ReviewSummary({ rating, reviews, filters, filterReviews }) {
  const getTotalReviews = (star) => (reviews.results?.filter((review) => review.rating === star).length);
  const totalReviews = reviews.results?.length;
  const starTotal = 5;// placeholder
  const featureAvg = ((starTotal - 1) * 25); // 1 star = 0%

  const selectionRating = {
    position: 'absolute',
    left: `${featureAvg}%`,
    bottom: '40%',
  };
  return (
    <section className="flex flex-col self-start pr-10 pt-4 pb-20">
      <p className=" text-lg text-gray-600 font-light pb-2">RATINGS & REVIEWS</p>
      <div className="flex flex-row pb-4">
        <h2 className="font-bold text-4xl">{starTotal}</h2>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((starRating) => (
            <input key={starRating} type="radio" className="mask mask-star-2 bg-primary" disabled checked={Math.round(starTotal === starRating)} />
          ))}
        </div>
      </div>
      <div className="grow text-base text-neutral-600">
        {[5, 4, 3, 2, 1].map((star) => (
          <p className="flex flex-row hover:underline pb-2 text-sm">
            <button key={star} onClick={() => filterReviews(star)}>{`${star} star`}</button>
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
  );
}

export default ReviewSummary;
