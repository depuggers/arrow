import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RelatedProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [defaultProducts, setDefaultProducts] = useState([]);

  useEffect(() => {
    axios.get('/products')
      .then((response) => {
        setAllProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('There was an error making  the request:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('/products/40345/related')
      .then((response) => {
        setDefaultProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>{defaultProducts}</div>
  );
}

export default RelatedProducts;
