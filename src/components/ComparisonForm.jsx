import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AppContext from '../context/AppContext';

function ComparisonForm({ defaultProduct }) {
  const { productID } = useContext(AppContext);
  const [currentProductFeatures, setCurrentProductFeatures] = useState(null);
  const [allFeatures, setAllFeatures] = useState(null);

  console.log(defaultProduct.features);
  const defaultProductFeatures = defaultProduct.features;

  useEffect(() => {
    axios.get(`/products/${productID}`)
      .then((response) => {
        setCurrentProductFeatures(response.data.features);
        console.log(response.data.features);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productID]);

  const combineAllFeatures = (defaultProductFeatures, currentProductFeatures) => {
    const combinedFeatures = [];
    defaultProductFeatures.forEach((feature) => {
      combinedFeatures.push({
        feature: feature.feature,
        defaultFeatureValue: feature.value,
        currentFeatureValue: currentProductFeatures.find((cpf) => cpf.feature === feature.feature)?.value || '',
      });
    });
    currentProductFeatures.forEach((feature) => {
      if (!defaultProductFeatures.some((dpf) => dpf.feature === feature.feature)) {
        combinedFeatures.push({
          feature: feature.feature,
          defaultFeatureValue: '',
          currentFeatureValue: feature.value,
        });
      }
    });
  };

  return (
    <div>Hi</div>
  );
}

export default ComparisonForm;
