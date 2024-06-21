import React, {
  useState, useEffect, useRef, useContext, useLayoutEffect,
} from 'react';
import { GoChevronRight, GoChevronLeft } from 'react-icons/go';
import axios from 'axios';
import RelatedProduct from './RelatedProduct';
import AppContext from '../context/AppContext';
import calculateRating from '../lib/calculateRating';

function RelatedProducts() {
//  const [defaultProducts, setDefaultProducts] = useState([]);
//  const [relatedProductImages, setRelatedProductImages] = useState(null);
//  const [rpRatings, setRPRatings] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [cardWidth, setCardWidth] = useState(null);
  const carouselRef = useRef(null);
  const firstCardRef = useRef(null);
  const { store: { defaultProducts }, store: { rpRatings }, store: { relatedProductImages } } = useContext(AppContext);

  /* useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(`/products/${productID}/related`);
        const relatedProductIds = response.data;

        const productPromises = relatedProductIds.map((item) => axios.get(`/products/${item}`));
        const ratingPromises = relatedProductIds.map((item) => axios.get(`/reviews/meta?product_id=${item}`));

        const productResponses = await Promise.all(productPromises);
        const ratingResponses = await Promise.all(ratingPromises);

        const relatedProductsData = productResponses.map((res) => res.data);
        setDefaultProducts(relatedProductsData);

        const ratings = ratingResponses.map((res) => calculateRating(res.data));
        setRPRatings(ratings);

        const stylePromises = relatedProductsData.map((product) => axios.get(`/products/${product.id}/styles`));
        const styleResponses = await Promise.all(stylePromises);

        const relatedStylesData = styleResponses.map((res) => res.data.results[0]);
        setRelatedProductImages(relatedStylesData);
      } catch (error) {
        console.error('Error fetching related products, ratings, or styles:', error);
      }
    };

    fetchRelatedProducts();
  }, [productID]); */

  const updateCardWidth = () => {
    if (firstCardRef.current) {
      setCardWidth(firstCardRef.current.clientWidth);
    } else {
      console.log('First Card is null');
    }
  };

  useLayoutEffect(() => {
    updateCardWidth();
  }, [firstCardRef.current]);

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
      window.addEventListener('resize', updateCardWidth);

      handleScroll();

      return () => {
        carousel.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
        window.removeEventListener('resize', updateCardWidth);
      };
    }
  }, [relatedProductImages]);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  };
  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full flex flex-col gap-6 text-neutral-600 pl-6 md:px-0 md:w-[80%]">
      <h3 className="text-base-content">RELATED PRODUCTS</h3>
      <div className="overflow-hidden w-full flex items-center px-0 md:px-20 relative">
        {canScrollLeft && (
        <button onClick={scrollLeft} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full z-10 hidden md:block" aria-label="Scroll left">
          <GoChevronLeft size={24} />
        </button>
        )}
        <div className="flex space-x-5 w-full md:w-4/5 ml-0 md:ml-20 overflow-x-auto md:overflow-hidden relative items-center" ref={carouselRef}>
          {relatedProductImages && rpRatings.length > 0 && defaultProducts.map((item, index) => (
            <RelatedProduct
              defaultProduct={item}
              key={item.id}
              defaultProductUrl={relatedProductImages[index]}
              defaultProductRating={rpRatings[index]}
              ref={index === 0 ? firstCardRef : null}
            />
          )) }
        </div>
        {canScrollRight && (
        <button
          onClick={scrollRight}
          aria-label="Scroll right"
          className="absolute right-4 md:right-20 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full z-10 hidden md:block"
        >
          <GoChevronRight size={24} />
        </button>
        )}
      </div>
    </div>
  );
}

export default RelatedProducts;
