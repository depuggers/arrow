import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProduct from './RelatedProduct';

function RelatedProducts() {
//  const [allProducts, setAllProducts] = useState([]);
  const [defaultProducts, setDefaultProducts] = useState([]);
  const [relatedProductImages, setRelatedProductImages] = useState(null);

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
    axios.get('/products/40345/related')
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

  return (
    <div className="container">
      {relatedProductImages ? defaultProducts.map((item, index) => (
        <RelatedProduct
          defaultProduct={item}
          key={item.id}
          defaultProductUrl={relatedProductImages[index]}
        />
      )) : null}
    </div>
  );
}

export default RelatedProducts;
