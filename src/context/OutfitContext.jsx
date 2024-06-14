import React, { createContext, useState, useEffect } from 'react';

export const OutfitContext = createContext(null);

export function OutfitProvider({ children }) {
  const [outfit, setOutfit] = useState(null);

  useEffect(() => {
    const savedOutfit = JSON.parse(localStorage.getItem('outfit')) || [];
    setOutfit(savedOutfit);
  }, []);

  const addToOutfitList = (product) => {
    if (!outfit.find((item) => item.id === product.id)) {
      const newOutfitList = [...outfit, product];
      setOutfit(newOutfitList);
      console.log('Product added to outfit:', product);
    } else {
      console.log('Product already in outfit:', product);
    }
  };

  const removeFromOutfitList = (productId) => {
    const newOutfitList = outfit.filter((item) => item.id !== productId);
    setOutfit(newOutfitList);
  };

  useEffect(() => {
    localStorage.setItem('outfit', JSON.stringify(outfit));
  }, [outfit]);

  return (
    <OutfitContext.Provider value={{ outfit, addToOutfitList, removeFromOutfitList }}>
      {children}
    </OutfitContext.Provider>
  );
}
