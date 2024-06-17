import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import { GoChevronRight, GoChevronLeft } from 'react-icons/go';
import axios from 'axios';
import RelatedProduct from './RelatedProduct';
import AppContext from '../context/AppContext';
import calculateRating from '../lib/calculateRating';

function RelatedProducts() {
  const [defaultProducts, setDefaultProducts] = useState([]);
  const [relatedProductImages, setRelatedProductImages] = useState(null);
  const [rpRatings, setRPRatings] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const carouselRef = useRef(null);
  const { productID } = useContext(AppContext);

  useEffect(() => {
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
  }, [productID]);

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
  }, [relatedProductImages]);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };
  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full flex flex-col gap-6  text-neutral-600">
      <h3 className="text-neutral-600">RELATED PRODUCTS</h3>
      {canScrollLeft && (
        <button onClick={scrollLeft} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full z-10" aria-label="Scroll left">
          <GoChevronLeft size={24} />
        </button>
      )}
      <div className="overflow-hidden w-full flex items-center px-20 relative">
        <div className="flex space-x-5 w-4/5 ml-20 overflow-hidden relative items-center" ref={carouselRef}>
          {relatedProductImages && rpRatings.length > 0 && defaultProducts.map((item, index) => (
            <RelatedProduct
              defaultProduct={item}
              key={item.id}
              defaultProductUrl={relatedProductImages[index]}
              defaultProductRating={rpRatings[index]}
            />
          )) }
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

export default RelatedProducts;
