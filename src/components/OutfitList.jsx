import React, {
  useContext, useState, useEffect, useRef,
} from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import OutfitCard from './OutfitCard';
import { OutfitContext } from '../context/OutfitContext';
import AppContext from '../context/AppContext';
import plusBigUrl from '../images/plusBig.svg?url';

console.log(plusBigUrl);

function OutfitList() {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const carouselRef = useRef(null);

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
      stars: rating.average,
    };
    console.log('Adding to outfit:', currentProduct);
    addToOutfitList(currentProduct);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const handleScroll = () => {
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
        setCanScrollLeft(carousel.scrollLeft > 0);
        setCanScrollRight(carousel.scrollLeft < maxScrollLeft);
      };

      carousel.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);

      handleScroll();

      return () => {
        carousel.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, [outfit]);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };
  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-6 w-full text-neutral-600 relative">
      <h3 className="text-base-content">YOUR OUTFIT</h3>
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute -left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full z-10"
          aria-label="Scroll left"
        >
          <GoChevronLeft size={24} />
        </button>
      )}
      <div className="overflow-hidden w-full flex items-center px-20 relative">
        <div className="carousel overflow-hidden space-x-5 flex w-4/5 ml-20" ref={carouselRef}>
          <div className="firstCard border border-gray-300 p-4 bg-white w-60 h-80 items-center" onClick={handleAddToOutfit}>
            <div className="imageContainer relative w-48 h-48 overflow-hidden rounded-lg mx-auto">
              <img src={plusBigUrl} alt="Add to Outfit" className="w-full h-full object-cover p-1 rounded-lg bg-gray-200" />
            </div>
            <p className="text-neutral-600 text-center p-6 font-bold">Add to Outfit</p>
          </div>
          {outfit && outfit.map((item) => (
            <OutfitCard product={item} key={item.id} />
          ))}
        </div>
      </div>
      {canScrollRight && (
        <button
          onClick={scrollRight}
          aria-label="Scroll right"
          className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full z-10"
        >
          <GoChevronRight size={24} />
        </button>
      )}
    </div>
  );
}

export default OutfitList;
