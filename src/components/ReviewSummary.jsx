import React, { useState } from 'react';
import { TbTriangleInvertedFilled } from 'react-icons/tb';
import axios from 'axios';
import convertStars from '../lib/convertStars';

function ReviewSummary({
  ratings, reviews, filters, filterReviews,
}) {
  const getTotalReviews = (star) => (reviews.results?.filter((review) => review.rating === star).length);
  const totalReviews = reviews.results?.length;
  const productChars = ratings.characteristics;
  console.log(productChars.Comfort);
  const starTotal = 5;// placeholder
  // const featureAvg = ((starTotal - 1) * 25); // 1 star = 0%

  let starRatings;
  if (ratings) {
    starRatings = convertStars(ratings);
  }
  const getFeatureData = (feature) => {
    // const featureData = `${productChars}.${feature}.value`;
    const featureData = productChars[feature].value;
    const featureAvg = ((featureData - 1) * 25); // 1 star = 0%
    return featureData;
  };

  const featureAvg = ((5 - 1) * 25); // 1 star = 0%
  const selectionRating = {
    position: 'absolute',
    left: `${featureAvg}%`,
    bottom: '40%',
  };
  console.log(getFeatureData('Comfort'));
  console.log(starRatings);
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
          <span className="flex flex-row hover:underline pb-2 text-sm">
            <button key={star} onClick={() => filterReviews(star)}>{`${star} star`}</button>
            <progress className="pl-2" value={getTotalReviews(star)} max={totalReviews} />
            <p>{`${getTotalReviews(star)} review(s)`}</p>
          </span>
        ))}
        <div className="pb-6 pt-2 flex flex-col w-full">
          <h4 className="text-sm">Size</h4>
          <div style={{ position: 'relative' }} className="flex flex-row   w-full">
            <span className="pr-2" style={selectionRating}><TbTriangleInvertedFilled className="text-sm" /></span>
            {/* 10% to 30% -- chaange to grid */}
          </div>
          <progress className="w-full h-2" value={0} />
          <div className="pb-6 flex items-center w-full justify-between gap-2 text-xs font-light">
            <p className="">Too Small</p>
            <p>Perfect</p>
            <p>Too Large</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm">Width</h4>
          <div style={{ position: 'relative' }} className="flex flex-row  w-full">
            <span className="pr-2" style={selectionRating}><TbTriangleInvertedFilled className="text-sm" /></span>
            {/* 10% to 30% -- chaange to grid */}
          </div>
          <progress className="w-full h-2" value={0} />
          <div className="pb-6 flex items-center w-full justify-between gap-2 text-xs font-light">
            <p className="">Too Small</p>
            <p>Perfect</p>
            <p>Too Large</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm">Comfort</h4>
          <div style={{ position: 'relative' }} className="flex flex-row w-full">
            <span className="pr-2" style={selectionRating}><TbTriangleInvertedFilled className="text-sm" /></span>
            {/* 10% to 30% -- chaange to grid */}
          </div>
          <progress className="w-full h-2" value={0} />
          <div className="pb-6 flex items-center w-full justify-between gap-2 text-xs font-light">
            <p className="">Too Small</p>
            <p>Perfect</p>
            <p>Too Large</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm">Quality</h4>
          <div style={{ position: 'relative' }} className="flex flex-row w-full">
            <span className="pr-2" style={selectionRating}><TbTriangleInvertedFilled className="text-sm" /></span>
            {/* 10% to 30% -- chaange to grid */}
          </div>
          <progress className="w-full h-2" value={0} />
          <div className="pb-6 flex items-center w-full justify-between gap-2 text-xs font-light">
            <p className="">Too Small</p>
            <p>Perfect</p>
            <p>Too Large</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm">Length</h4>
          <div style={{ position: 'relative' }} className="flex flex-row w-full">
            <span className="pr-2" style={selectionRating}><TbTriangleInvertedFilled className="text-sm" /></span>
            {/* 10% to 30% -- chaange to grid */}
          </div>
          <progress className="w-full h-2" value={0} />
          <div className="pb-6 flex items-center w-full justify-between gap-2 text-xs font-light">
            <p className="">Too Small</p>
            <p>Perfect</p>
            <p>Too Large</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm">Fit</h4>
          <div style={{ position: 'relative' }} className="flex pt-1 flex-row w-full">
            <span className="pr-2" style={selectionRating}><TbTriangleInvertedFilled className="text-sm" /></span>
            {/* 10% to 30% -- chaange to grid */}
          </div>
          <progress className="w-full h-2" value={0} />
          <div className="pb-6 flex items-center w-full justify-between gap-2 text-xs font-light">
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
