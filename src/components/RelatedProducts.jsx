import React, { useState, useEffect, useRef } from 'react';
import { GoChevronRight, GoChevronLeft } from 'react-icons/go';
import axios from 'axios';
import RelatedProduct from './RelatedProduct';

function RelatedProducts() {
//  const [allProducts, setAllProducts] = useState([]);
  const [defaultProducts, setDefaultProducts] = useState([]);
  const [relatedProductImages, setRelatedProductImages] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const carouselRef = useRef(null);

  /* useEffect(() => {
    axios.get('/products')
      .then((response) => {
        setAllProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('There was an error making  the request:', error);
      });
  }, []); */

  useEffect(() => {
    axios.get('/products/40346/related')
      .then((response) => {
        console.log(response.data);
        const relatedProductIds = response.data.map((item) => axios.get(`/products/${item}`));
        return Promise.all(relatedProductIds);
      })
      .then((responses) => {
        console.log(responses);
        const relatedProductsData = responses.map((item) => item.data);
        setDefaultProducts(relatedProductsData);

        const relatedProductStyles = relatedProductsData.map((product) => axios.get(`/products/${product.id}/styles`));
        return Promise.all(relatedProductStyles);
      })
      .then((responses) => {
        const relatedStylesData = responses.map((item) => item.data.results[0]);
        console.log(relatedStylesData);
        setRelatedProductImages(relatedStylesData);
      })
      .catch((error) => {
        console.error('Error fetching related products or styles:', error);
      });
  }, []);

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
    <div className="relative w-full flex flex-col gap-6">
      <h3 className="text-neutral-600">RELATED PRODUCTS</h3>
      {canScrollLeft && (
        <button onClick={scrollLeft} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full z-10" aria-label="Scroll left">
          <GoChevronLeft size={24} />
        </button>
      )}
      <div className="overflow-hidden w-full flex items-center px-20 relative">
        <div className="flex space-x-5 w-4/5 ml-20 overflow-hidden relative items-center" ref={carouselRef}>
          {relatedProductImages ? defaultProducts.map((item, index) => (
            <RelatedProduct
              defaultProduct={item}
              key={item.id}
              defaultProductUrl={relatedProductImages[index]}
            />
          )) : null}
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
