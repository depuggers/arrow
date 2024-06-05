import React, { useState, useEffect } from 'react';

function ProductDetails() {
  const [product, setProduct] = useState();

  const getDetails = async () => {
    let response = await fetch('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', {
      headers: {
        Authorization: process.env.GH_TOKEN,
      },
    });
    response = await response.json();
    setProduct(response[0]);
  };

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <>
      <pre>{JSON.stringify(product, null, 2)}</pre>
    </>
  );
}

export default ProductDetails;
