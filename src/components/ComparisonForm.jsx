import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AppContext from '../context/AppContext';

function ComparisonForm({ defaultProduct }) {
  const { hideModal } = useContext(AppContext);
  const { productID } = useContext(AppContext);
  const [currentProductFeatures, setCurrentProductFeatures] = useState(null);
  const [allFeatures, setAllFeatures] = useState(null);
  const [currentProductName, setCurrentProductName] = useState(null);

  console.log(defaultProduct.features);
  const defaultProductFeatures = defaultProduct.features;
  const defaultProductName = defaultProduct.name;


  useEffect(() => {
    axios.get(`/products/${productID}`)
      .then((response) => {
        setCurrentProductFeatures(response.data.features);
        setCurrentProductName(response.data.name);
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
        feature: feature.value,
        defaultFeatureValue: '✔️',
        currentFeatureValue: currentProductFeatures.find((cpf) => cpf.feature === feature.feature) ? '✔️' : '✖️',
      });
    });
    currentProductFeatures.forEach((feature) => {
      if (!defaultProductFeatures.some((dpf) => dpf.feature === feature.feature)) {
        combinedFeatures.push({
          feature: feature.value,
          defaultFeatureValue: '✖️',
          currentFeatureValue: '✔️',
        });
      }
    });

    setAllFeatures(combinedFeatures);
  };

  useEffect(()=>{
    if (defaultProductFeatures && currentProductFeatures) {
      combineAllFeatures(defaultProductFeatures, currentProductFeatures);
    }
  }, [defaultProductFeatures, currentProductFeatures])

  return (
    <>
    {allFeatures ? (
    <div className="text-neutral-600 bg-white z-10">
      <h2>COMPARING</h2>
      <button onClick={hideModal}>❎</button>
      <table>
        <thead>
          <tr>
            <th>{currentProductName}</th>
            <th></th>
            <th>{defaultProductName}</th>
          </tr>
        </thead>
        <tbody>
          {allFeatures.map((feature, index) => (
            <tr key={index}>
              <td>{feature.currentFeatureValue}</td>
              <td>{feature.feature}</td>
              <td>{feature.defaultFeatureValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : null
}
</>
  );
}

export default ComparisonForm;
