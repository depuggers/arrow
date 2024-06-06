import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RelatedProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [defaultProducts, setDefaultProducts] = useState([]);

  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products';
  const url1 = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/40344/related';

  const headers = {
    Authorization: process.env.GH_TOKEN,
  };

  useEffect(() => {
    axios.get(url, { headers })
      .then((response) => {
        setAllProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('There was an error making  the request:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(url1, { headers })
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
