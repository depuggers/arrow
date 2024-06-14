const combineAllFeatures = (defaultProductFeatures, currentProductFeatures) => {
  const combinedFeatures = [];
  defaultProductFeatures.forEach((feature) => {
    combinedFeatures.push({
      feature: feature.value,
      defaultFeatureValue: '✔️',
      currentFeatureValue: currentProductFeatures.find((cpf) => cpf.value === feature.value) ? '✔️' : '✖️',
    });
  });
  currentProductFeatures.forEach((feature) => {
    if (!defaultProductFeatures.some((dpf) => dpf.value === feature.value)) {
      combinedFeatures.push({
        feature: feature.value,
        defaultFeatureValue: '✖️',
        currentFeatureValue: '✔️',
      });
    }
  });

  return combinedFeatures;
};

export default combineAllFeatures;
