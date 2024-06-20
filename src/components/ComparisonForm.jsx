import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { BiWindowClose } from 'react-icons/bi';
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
      const featureValue = feature.value || '';
      combinedFeatures.push({
        feature: `${featureValue.trim()} ${feature.feature.trim()}`,
        defaultFeatureValue: '✔️',
        currentFeatureValue: currentProductFeatures.find((cpf) => cpf.value === feature.value) ? '✔️' : '',
      });
    });
    currentProductFeatures.forEach((feature) => {
      if (!defaultProductFeatures.some((dpf) => dpf.value === feature.value)) {
        const featureValue = feature.value || '';
        combinedFeatures.push({
          feature: `${featureValue.trim()} ${feature.feature.trim()}`,
          defaultFeatureValue: '',
          currentFeatureValue: '✔️',
        });
      }
    });

    setAllFeatures(combinedFeatures);
  };

  useEffect(() => {
    if (defaultProductFeatures && currentProductFeatures) {
      combineAllFeatures(defaultProductFeatures, currentProductFeatures);
    }
  }, [defaultProductFeatures, currentProductFeatures]);

  return (
    <>
      {allFeatures ? (
        <div className="relative w-full max-w-xl mx-auto text-neutral-600 bg-white z-10 p-4">
          <h2 className="text-center p-2">COMPARING</h2>
          <button onClick={hideModal} className="absolute right-2 top-2 text-xl" aria-label="close"><BiWindowClose /></button>
          <div className="overflow-y-auto max-h-80">
          <table className="w-full text-center text-neutral-600">
            <thead className="text-neutral-600 bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-2">{currentProductName}</th>
                <th scope="col" className="px-6 py-2" aria-label="space" />
                <th scope="col" className="px-6 py-2">{defaultProductName}</th>
              </tr>
            </thead>
            <tbody>
              {allFeatures.map((feature, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-2">{feature.currentFeatureValue}</td>
                  <td className="px-6 py-2">{feature.feature}</td>
                  <td className="px-6 py-2">{feature.defaultFeatureValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ComparisonForm;
