import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import AppContext from '../context/AppContext';

function ProductDetails() {
  const [product, setProduct] = useState();

  const { productID, setProductID } = useContext(AppContext);

  const getDetails = async () => {
    const response = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productID}`, {
      headers: {
        Authorization: process.env.GH_TOKEN,
      },
    });
    setProduct(response.data);
  };

  useEffect(() => {
    getDetails();
  }, [productID]);

  return (
    <>
      <pre>{JSON.stringify(product, null, 2)}</pre>
      <button onClick={() => setProductID(40345)}>Click</button>
    </>
  );
}

export default ProductDetails;
