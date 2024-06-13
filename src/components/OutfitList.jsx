import React, { useContext } from 'react';
import OutfitCard from './OutfitCard';
import { OutfitContext } from '../context/OutfitContext';
import plusBig from '../images/plusBig.png';

function OutfitList() {
  const { outfit, addToOutfitList } = useContext(OutfitContext);

  return (
    <div className="flex flex-col gap-6 text-neutral-600 w-full">
      <h3 className="text-neutral-600">YOUR OUTFIT</h3>
      <div className="carousel overflow-x-auto space-x-5 flex w-4/5">
        <div className="OutfitCard border border-gray-300 p-4 bg-white w-60 h-80">
          <div className="relative w-48 h-48 overflow-hidden rounded-lg">
            <img src={plusBig} alt="Add to Outfit" className="w-full h-full object-cover p-1 rounded-lg" />
          </div>
          <p className="text-neutral-600">Add to Outfit</p>
        </div>
      </div>
      <OutfitCard />
    </div>
  );
}

export default OutfitList;
