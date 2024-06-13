import React, { useContext } from 'react';
import OutfitCard from './OutfitCard';
import { OutfitContext } from '../context/OutfitContext';
import AppContext from '../context/AppContext';
import plusBig from '../images/plusBig.png';

function OutfitList() {
  const { outfit, addToOutfitList } = useContext(OutfitContext);
  const {
    store: { product }, store: { styles }, store: { selectedStyle }, store: { rating },
  } = useContext(AppContext);

  const handleAddToOutfit = () => {
    if (!product || !styles || selectedStyle === undefined) {
      console.error('Product or styles data is missing');
      return;
    }

    const currentProduct = {
      id: product.id,
      category: product.category,
      name: product.name,
      photo: styles[selectedStyle].photos[0].url,
      oriPrice: styles[selectedStyle].original_price,
      salePrice: styles[selectedStyle].sale_price || null,
    };
    console.log('Adding to outfit:', currentProduct);
    addToOutfitList(currentProduct);
  };

  return (
    <div className="flex flex-col gap-6 text-neutral-600 w-full">
      <h3 className="text-neutral-600">YOUR OUTFIT</h3>
      <div className="carousel overflow-x-auto space-x-5 flex w-4/5">
        <div className="firstCard border border-gray-300 p-4 bg-white w-60 h-80 items-center" onClick={handleAddToOutfit}>
          <div className="imageContainer relative w-48 h-48 overflow-hidden rounded-lg mx-auto">
            <img src={plusBig} alt="Add to Outfit" className="w-full h-full object-cover p-1 rounded-lg bg-gray-200" />
          </div>
          <p className="text-neutral-600 text-center p-6 font-bold">Add to Outfit</p>
        </div>
        {outfit && outfit.map((item) => <OutfitCard product={item} key={item.id} />)}
      </div>
    </div>
  );
}

export default OutfitList;
