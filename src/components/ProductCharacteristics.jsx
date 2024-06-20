import React from 'react';
import { TbTriangleInvertedFilled } from 'react-icons/tb';

function ProductCharacteristics({
  ratings, reviews,
}) {
  const getTotalReviews = (star) => (reviews.results?.filter((review) => review.rating === star).length);
  const totalReviews = reviews.results?.length;
  const productChars = ratings.characteristics;
  const relevantChars = Object.keys(productChars);

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

  return (

    <section className="flex flex-col self-start pr-10 pt-4 pb-20 ">
      <h2 className="flex flex-row justify-center text-sm text-gray-700 font-semibold pb-2">RATING BREAKDOWN</h2>
      <div className="flex flex-row font-bold text-sm justify-between">
        <p />
        {/* <p>#Reviews</p> */}
      </div>
      <div className="grow text-base text-neutral-600">
        <div className="pt-10">
          <h4 className="text-base">Size</h4>
          {/* replace */}
          {}
          <div style={{ position: 'relative' }} className="flex flex-row w-full">
            <span className="pr-2" style={getFeatureData('Quality')}><TbTriangleInvertedFilled className="text-sm" /></span>
            <div
              className="grid grid-cols-5 w-full gap-1 h-2"
            >
              {Array(5).fill(0).map((item, index) => <div key={index} className="w-full h-full bg-zinc-400" />)}
            </div>

          </div>

          <div className="pb-6 flex items-center w-full justify-between gap-2 text-xs text-neutral-600 font-light">
            <p>Too Small</p>
            <p>Perfect</p>
            <p>Too Wide</p>
          </div>
        </div>
        <div className="pt-10">
          <h4 className="text-base pb-2">Width</h4>
          <div style={{ position: 'relative' }} className="flex flex-row w-full">
            <span className="pr-2" style={getFeatureData('Length')}><TbTriangleInvertedFilled className="text-sm" /></span>
            {/* replace */}
            <div className="grid grid-cols-5 w-full gap-1 h-2">
            {Array(5).fill(0).map((item, index) => <div className="w-full h-full bg-zinc-400" key={index} />)}
            </div>

          </div>

          <div className="pb-6 flex items-center w-full justify-between gap-2 text-xs text-neutral-600 font-light">
            <p>Too Narrow</p>
            <p>Perfect</p>
            <p>Too Wide</p>
          </div>
        </div>
        <div className="pt-10">
          <h4 className="text-base pb-2">Comfort</h4>
          <div style={{ position: 'relative' }} className="flex flex-row w-full">
            <span className="pr-2" style={getFeatureData('Comfort')}><TbTriangleInvertedFilled className="text-sm" /></span>
            <div className="grid grid-cols-5 w-full gap-1 h-2">
            {Array(5).fill(0).map((item, index) => <div className="w-full h-full bg-zinc-400" key={index} />)}
            </div>

          </div>

          <div className="pb-6 flex items-center w-full justify-between gap-2 text-xs text-neutral-600 font-light">
            <p>Comfort</p>
            <p>Ok</p>
            <p>Perfect</p>
          </div>
        </div>
        <div className="pt-10">
          <h4 className="text-base pb-2">Quality</h4>
          <div style={{ position: 'relative' }} className="flex flex-row w-full">
            <span className="pr-2" style={getFeatureData('Quality')}><TbTriangleInvertedFilled className="text-sm" /></span>
            <div className="grid grid-cols-5 w-full gap-1 h-2">
            {Array(5).fill(0).map((item, index) => <div className="w-full h-full bg-zinc-400" key={index} />)}
            </div>

          </div>

          <div className="pb-6 flex items-center w-full justify-between gap-2 text-xs text-neutral-600 font-light">
            <p>Poor</p>
            <p>What I expected</p>
            <p>Perfect</p>
          </div>
        </div>
        <div className="pt-10">
          <h4 className="text-base pb-2">Length</h4>
          <div style={{ position: 'relative' }} className="flex flex-row w-full">
            <span className="pr-2" style={getFeatureData('Length')}><TbTriangleInvertedFilled className="text-sm" /></span>
            <div className="grid grid-cols-5 w-full gap-1 h-2">
            {Array(5).fill(0).map((item, index) => <div className="w-full h-full bg-zinc-400" key={index} />)}
            </div>

          </div>

          <div className="pb-6 flex items-center w-full justify-between gap-2 text-xs text-neutral-600 font-light">
            <p>Runs Short</p>
            <p>Perfect</p>
            <p>Runs Long</p>
          </div>
        </div>
        <div className="pt-10">
          <h4 className="text-base pb-2">Fit</h4>
          <div style={{ position: 'relative' }} className="flex flex-row w-full">
            <span className="pr-2" style={getFeatureData('Quality')}><TbTriangleInvertedFilled className="text-sm" /></span>
            <div className="grid grid-cols-5 w-full gap-1 h-2">
              {Array(5).fill(0).map((item, index) => <div className="w-full h-full bg-zinc-400" key={index} />)}
            </div>

          </div>

          <div className="pb-6 flex items-center w-full justify-between gap-2 text-xs text-neutral-600 font-light">
            <p>Runs Tight</p>
            <p>Perfect</p>
            <p>Runs Long</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductCharacteristics;
