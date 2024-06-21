import React from 'react';
import { TbTriangleInvertedFilled } from 'react-icons/tb';

function ProductCharacteristics({
  ratings, reviews,
}) {
  const getTotalReviews = (star) => (reviews.results?.filter((review) => review.rating === star).length);

  const productChars = ratings.characteristics;

  const relevantChars = Object.keys(productChars);
  const getFeatureData = (feature) => {
    const featureData = productChars[feature].value;
    const featureAvg = ((featureData) * 20);

    const selectionRating = {
      position: 'absolute',
      left: `${featureAvg}%`,
      bottom: '90%',
    };
    return selectionRating;
  };

  const productFeatures = {
    Size: ['Too Small', 'Perfect', 'Too Wide'],
    Comfort: ['Uncomfortable', 'Ok', 'Perfect'],
    Fit: ['Runs Tight', 'Perfect', 'Runs Long'],
    Width: ['Too Narrow', 'Perfect', 'Too Wide'],
    Length: ['Runs Short', 'Perfect', 'Runs Long'],
    Quality: ['Poor', 'What I Expected', 'Perfect'],
  };
  //
  return (

    <section className="flex flex-col h-full w-full pt-4 text-base-content">

      <div className="flex flex-row font-bold text-sm justify-between">
        <p />

      </div>
      <div className="w-full flex flex-col text-base md:gap-4">
        {relevantChars.map((feature, index) => (
          <div className="flex flex-col mb-2" key={index}>
            <h2 className="text-xl w-full">{feature}</h2>
            <div style={{ position: 'relative' }} className="flex flex-col w-full">
              <span className=" w-full pb-1" style={getFeatureData(feature)}>
                <TbTriangleInvertedFilled className="text-base" />
              </span>
              <div className="grid grid-cols-5 w-full gap-1 h-4 mb-1">
                {Array(5).fill(0).map((item, idx) => <div key={idx} className="w-full bg-zinc-400" />)}
              </div>
              <div className="pb-1 inset-x-0 bottom-0 flex h-auto flex-row w-full justify-between gap-1 text-s font-light">
                {productFeatures[feature].map((item, i) => (<span key={i}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

export default ProductCharacteristics;
