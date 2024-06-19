import React from 'react';
import { TbTriangleInvertedFilled } from 'react-icons/tb';
import StarRating from './StarRating';

function ReviewSummary({
  ratings, reviews, avgRatings, filters, setFilters,
}) {
  const getTotalReviews = (star) => (reviews.results?.filter((review) => review.rating === star).length);
  const totalReviews = reviews.results?.length;
  const productChars = ratings.characteristics;

  const roundedAvg = Math.round(avgRatings * 10) / 10;

  const getFeatureData = (feature) => {
    // const featureData = `${productChars}.${feature}.value`;
    const featureData = productChars[feature].value;
    const featureAvg = ((featureData) * 20);

    const selectionRating = {
      position: 'absolute',
      left: `${featureAvg}%`,
      top: '90%',
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

    <section className="flex flex-col self-start pr-10 pt-4 pb-20 ">
      <p className=" text-lg text-gray-600 font-light pb-2">RATINGS & REVIEWS</p>
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
      <h2 className="flex flex-row justify-center text-sm font-bold pb-4">Rating Breakdown</h2>
      <div className="grow text-base text-neutral-600">
        {[5, 4, 3, 2, 1].map((star) => (
          <span className="flex flex-row hover:underline pb-2 text-sm">
            <button key={star} onClick={() => toggleSearch(star)}>{`#Stars: ${star}`}</button>
            <progress className="pl-2 pt-1 text-sm" value={getTotalReviews(star)} max={totalReviews} />
            <p>{`${getTotalReviews(star)} review(s)`}</p>
          </span>
        ))}
        <div className="pt-10">
          <h4 className="text-sm text-neutral-500">Size</h4>
          <div style={{ position: 'relative' }} className="flex flex-row w-full">
            <div className="grid grid-cols-5 w-full gap-1 h-2">
              {Array(5).fill(0).map((item) => <div className="w-full h-full bg-zinc-400" />)}
            </div>
            <span className="pr-2" style={getFeatureData('Quality')}><TbTriangleInvertedFilled className="text-sm" /></span>

          </div>

          <div className="pb-6 flex items-center w-full justify-between gap-2 text-xs font-light">
            <p>Poor</p>
            <p>What I expected</p>
            <p>Perfect</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm">Width</h4>
          <div style={{ position: 'relative' }} className="flex flex-row  w-full">
            <span className="pr-2" style={getFeatureData('Length')}><TbTriangleInvertedFilled className="text-sm" /></span>
          </div>
          <progress className="w-full h-2" value={0} />
          <div className="pb-6 flex items-center w-full justify-between gap-2 text-xs font-light">
            <p className="">Too Narrow</p>
            <p>Perfect</p>
            <p>Too Large</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm">Comfort</h4>
          <div style={{ position: 'relative' }} className="flex flex-row w-full">
            <span className="pr-2" style={getFeatureData('Comfort')}><TbTriangleInvertedFilled className="text-sm" /></span>
          </div>
          <progress className="w-full h-2" value={0} />
          <div className="pb-6 flex items-center w-full justify-between gap-2 text-xs font-light">
            <p className="">Uncomfortable</p>
            <p>OK</p>
            <p>Perfect</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm">Quality</h4>
          <div style={{ position: 'relative' }} className="flex flex-row w-full">
            <span className="pr-2" style={getFeatureData('Quality')}><TbTriangleInvertedFilled className="text-sm" /></span>
          </div>
          <progress className="w-full h-2" value={0} />
          <div className="pb-6 flex items-center w-full justify-between gap-2 text-xs font-light">
            <p className="">Poor</p>
            <p>What I expected</p>
            <p>Perfect</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm">Length</h4>
          <div style={{ position: 'relative' }} className="flex flex-row w-full">
            <span className="pr-2" style={getFeatureData('Length')}><TbTriangleInvertedFilled className="text-sm" /></span>
          </div>
          <progress className="w-full h-2" value={0} />
          <div className="pb-6 flex items-center w-full justify-between gap-2 text-xs font-light">
            <p className="">Runs Short</p>
            <p>Perfect</p>
            <p>Runs Long</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm">Fit</h4>
          <div style={{ position: 'relative' }} className="flex pt-1 flex-row w-full">
            <span className="pr-2" style={getFeatureData('Fit')}><TbTriangleInvertedFilled className="text-sm" /></span>
            {/* 10% to 30% -- chaange to grid */}
          </div>
          <progress className="w-full h-2" value={0} />
          <div className="pb-6 flex items-center w-full justify-between gap-2 text-xs font-light">
            <p className="">Runs Tight</p>
            <p>Perfect</p>
            <p>Runs Long</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ReviewSummary;
