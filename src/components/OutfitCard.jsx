import React, { useContext, memo } from 'react';
import { CiCircleRemove } from 'react-icons/ci';
import { OutfitContext } from '../context/OutfitContext';
import StarRating from './StarRating';
import missing from '../images/missing.svg?url';

const OutfitCard = memo(({ product }) => {
  const { removeFromOutfitList } = useContext(OutfitContext);

  const handleRemove = () => {
    removeFromOutfitList(product.id);
  };

  return (
    <div className="productCard border border-gray-300 p-4 bg-white w-60 h-80 items-center">
      <div className="imageContainer relative w-48 h-48 overflow-hidden rounded-lg mx-auto">
        <img src={product.photo ?? missing} alt={product.name} className="w-full h-full object-cover rounded-lg p-1" />
        <button type="button" className="absolute top-2 right-2 z-10 bg-white rounded-badge" aria-label="remove" onClick={handleRemove}><CiCircleRemove /></button>
      </div>
      <p className="text-gray-500 text-center text-xs">{product.category.toUpperCase()}</p>
      <h3 className="font-bold text-center text-gray-900 overflow-hidden whitespace-nowrap overflow-ellipsis">{product.name}</h3>
      {product.salePrice ? (
        <p className="text-gray-700 text-sm text-center">
          <s className="text-lg">
            $
            {product.oriPrice}
          </s>
          {' $'}
          {product.salePrice}
        </p>
      )
        : (
          <p className="text-gray-700 text-sm text-center">
            $
            {product.oriPrice}
          </p>
        )}
      <div className="transform scale-75">
        <StarRating rating={product.stars} name={`${product.id}of`} />
      </div>
    </div>
  );
});

export default OutfitCard;
