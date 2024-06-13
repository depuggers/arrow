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
    }
  };

  useEffect(() => {
    localStorage.setItem('outfit', JSON.stringify(outfit));
  }, [outfit]);

  return (
    <OutfitContext.Provider value={{ outfit, addToOutfitList }}>
      {children}
    </OutfitContext.Provider>
  );
}
