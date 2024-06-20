import React, { useContext, forwardRef, useEffect } from 'react';
import AppContext from '../context/AppContext';
import ComparisonForm from './ComparisonForm';
import StarRating from './StarRating';
import missing from '../images/missing.svg?url';

const RelatedProduct = forwardRef(({ defaultProduct, defaultProductUrl, defaultProductRating }, ref) => {
  const { showModal, setProductID } = useContext(AppContext);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const handleClick = () => {
    setProductID(defaultProduct.id);
    scrollToTop();
  };

  return (
    defaultProductRating && defaultProductUrl && (
    <div className="relative" ref={ref}>
      <div className="border border-gray-300 p-2 md:p-4 bg-base-100 w-40 h-60 md:w-60 md:h-80 " onClick={handleClick}>
        <div className="relative w-32 h-32 md:w-48 md:h-48 overflow-hidden rounded-lg mx-auto justify-center">
          <img src={defaultProductUrl.photos[0].url ?? missing} alt={defaultProduct.name} className="w-full h-full object-cover p-1 rounded-lg" />
        </div>
        <p className="text-gray-500 text-center text-xxs md:text-xs">{defaultProduct?.category.toUpperCase()}</p>
        <h3 className="font-bold text-center text-base-content overflow-hidden whitespace-nowrap overflow-ellipsis text-xs md:text-base">{defaultProduct?.name}</h3>
        <p className="text-base-content text-xs md:text-sm text-center">
          $
          {defaultProduct?.default_price}
        </p>
        <div className="flex justify-center items-center p-2">
          <StarRating rating={defaultProductRating.average} size={1.05} />
        </div>
      </div>
      <button onClick={() => showModal(<ComparisonForm defaultProduct={defaultProduct} />)} type="button" className="absolute top-1 right-1.5 z-10">⭐️</button>
    </div>
    )
  );
});

export default RelatedProduct;
