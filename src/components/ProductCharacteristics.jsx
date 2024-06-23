import React, { useContext } from 'react';
import { TbTriangleInvertedFilled } from 'react-icons/tb';
import AppContext from '../context/AppContext';

export function ProductCharacteristics({ ratings }) {
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
    Size: [
      'Too Small',
      'Perfect',
      'Too Wide'],
    Comfort: [
      'Uncomfortable',
      'Ok',
      'Perfect',
    ],
    Fit: [
      'Runs Tight',
      'Perfect',
      'Runs Long',
    ],
    Width: [
      'Too Narrow',
      'Perfect',
      'Too Wide',
    ],
    Length: [
      'Runs Short',
      'Perfect',
      'Runs Long',
    ],
    Quality: [
      'Poor',
      'What I Expected',
      'Perfect',
    ],
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
                {Array(5).fill(0).map((item, idx) => <div key={idx} className="w-full bg-zinc-400 dark:bg-neutral-300" />)}
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

export function ProductCharacteristicsReview() {
  const {
    store: { ratings },
  } = useContext(AppContext);
  const productChars = ratings.characteristics;
  const relevantChars = Object.keys(productChars);

  const fullProductFeatures = {

    Size: [
      'A size too small',
      '½ a size too small',
      'Perfect',
      '½ a size too big',
      'A size too wide',
    ],
    Width: [
      'Too narrow',
      'Slightly narrow',
      'Perfect',
      'Slightly wide',
      'Too wide',
    ],
    Comfort: [
      'Uncomfortable',
      'Slightly uncomfortable',
      'Ok',
      'Comfortable',
      'Perfect',
    ],
    Quality: [
      'Poor',
      'Below average',
      'What I expected',
      'Pretty great',
      'Perfect',
    ],
    Length: [
      'Runs Short',
      'Runs slightly short',
      'Perfect',
      'Runs slightly long',
      'Runs long',
    ],
    Fit: [
      'Runs tight',
      'Runs slightly tight',
      'Perfect',
      'Runs slightly long',
      'Runs long',
    ],
  };
  return (
    <div className>
      {relevantChars.includes('Size') && (
      <div className="w-full flex items-center justify-between border-gray-200 rounded-lg">
        <h2 className="w-1/2 text-center pr-4">Size</h2>
        <ul className="w-1/2 justify-self-end">
          {fullProductFeatures.Size.map((option, index) => (
            <li className="w-full" key={index}>
              <div className="flex items-center gap-2">

                <input className="w-4 h-4 border-gray-300" type="radio" id={`size${index}`} name="size" value={option} />
                <label htmlFor={`size${index}`} className="py-1 text-sm font-medium">{option}</label>
              </div>
            </li>
          ))}
        </ul>
      </div>
      )}
      {relevantChars.includes('Comfort') && (
      <div className="w-full flex items-center justify-between border-gray-200 border-b-2">
        <h2 className="w-1/2 text-center pr-4">Comfort</h2>
        <ul className="w-1/2 justify-self-end">
          {fullProductFeatures.Comfort.map((option, index) => (
            <li className="w-full" key={index}>
              <div className="flex items-center gap-2">

                <input className="w-4 h-4 border-gray-300" type="radio" id={`comfort${index}`} name="comfort" value={option} />
                <label htmlFor={`comfort${index}`} className="py-1 text-sm font-medium">{option}</label>
              </div>
            </li>
          ))}
        </ul>
      </div>
      )}
      {relevantChars.includes('Width') && (
      <div className="w-full flex items-center justify-between border-gray-200 border-b-2">
        <h2 className="w-1/2 text-center pr-4">Width</h2>
        <ul className="w-1/2 justify-self-end">
          {fullProductFeatures.Width.map((option, index) => (
            <li className="w-full" key={index}>
              <div className="flex items-center gap-2">

                <input className="w-4 h-4 border-gray-300" type="radio" id={`width${index}`} name="width" value={option} />
                <label htmlFor={`width${index}`} className="py-1 text-sm font-medium">{option}</label>
              </div>
            </li>
          ))}
        </ul>
      </div>
      )}
      {relevantChars.includes('Quality') && (
      <div className="w-full flex items-center justify-between border-gray-200 border-b-2">
        <h2 className="w-1/2 text-center pr-4">Quality</h2>
        <ul className="w-1/2 justify-self-end">
          {fullProductFeatures.Quality.map((option, index) => (
            <li className="w-full" key={index}>
              <div className="flex items-center gap-2">

                <input className="w-4 h-4 border-gray-300" type="radio" id={`quality${index}`} name="quality" value={option} />
                <label htmlFor={`width${index}`} className="py-1 text-sm font-medium">{option}</label>
              </div>
            </li>
          ))}
        </ul>
      </div>
      )}
      {relevantChars.includes('Length') && (
      <div className="w-full flex items-center justify-between border-gray-200 border-b-2">
        <h2 className="w-1/2 text-center pr-4">Length</h2>
        <ul className="w-1/2 justify-self-end">
          {fullProductFeatures.Length.map((option, index) => (
            <li className="w-full" key={index}>
              <div className="flex items-center gap-2">

                <input className="w-4 h-4 border-gray-300" type="radio" id={`length${index}`} name="length" value={option} />
                <label htmlFor={`width${index}`} className="py-1 text-sm font-medium">{option}</label>
              </div>
            </li>
          ))}
        </ul>
      </div>
      )}
      {relevantChars.includes('Fit') && (
      <div className="w-full flex items-center justify-between border-gray-200 border-b-2">
        <h2 className="w-1/2 text-center pr-4">Fit</h2>
        <ul className="w-1/2 justify-self-end">
          {fullProductFeatures.Fit.map((option, index) => (
            <li className="w-full" key={index}>
              <div className="flex items-center gap-2">

                <input className="w-4 h-4 border-gray-300" type="radio" id={`fit${index}`} name="fit" value={option} />
                <label htmlFor={`width${index}`} className="py-1 text-sm font-medium">{option}</label>
              </div>
            </li>
          ))}
        </ul>
      </div>
      )}
    </div>
  );
}
