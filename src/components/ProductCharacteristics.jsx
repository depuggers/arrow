import React from 'react';
import { TbTriangleInvertedFilled } from 'react-icons/tb';

function ProductCharacteristics({
  ratings, reviews,
}) {
  const getTotalReviews = (star) => (reviews.results?.filter((review) => review.rating === star).length);

  const productChars = ratings.characteristics;

  const relevantChars = Object.keys(productChars);

  const getFeatureData = (feature) => {
    // const featureData = `${productChars}.${feature}.value`;
    const featureData = productChars[feature].value;
    const featureAvg = ((featureData) * 20);

    console.log(relevantChars);
    console.log(productChars);
    const selectionRating = {
      position: 'absolute',
      left: `${featureAvg}%`,
      bottom: '10%',
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

    <section className="flex flex-col h-full pr-10 pt-4 text-base-content">
      <h2 className="flex flex-row justify-center text-sm font-semibold pb-2">RATING BREAKDOWN</h2>
      <div className="flex flex-row font-bold text-sm justify-between">
        <p />

      </div>
      <div className="w-full flex flex-col text-base">
        {relevantChars.map((feature, index) => (
          <div className="flex flex-row" key={index}>
            <h4 className="text-base w-full">{feature}</h4>
            <div style={{ position: 'relative' }} className="flex flex-row w-full">
              <span className="pr-2 w-full" style={getFeatureData(feature)}>
                <TbTriangleInvertedFilled className="text-sm" />
                <span className="pb-6 flex flex-row w-full justify-between gap-2 text-xs font-light">{productFeatures[feature]}</span>
              </span>
              <div className="grid grid-cols-5 w-full gap-1 h-2">{Array(5).fill(0).map((item) => <div className="w-full bg-zinc-400" />)}</div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

export default ProductCharacteristics;
