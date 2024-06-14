import combineAllFeatures from '../lib/combineAllFeatures';

describe('Comparing Modal', ()=> {
  const defaultProductFeatures = [
    { feature: 'Battery Life', value: '10 hours' },
    { feature: 'Weight', value: '1.2 kg' },
    { feature: 'Screen Size', value: '15 inch' }
  ];

  const currentProductFeatures = [
    { feature: 'Battery Life', value: '10 hours' },
    { feature: 'Weight', value: '1.3 kg' }
  ];

  test('properly merges features of the two products', ()=> {
    expect(combineAllFeatures(defaultProductFeatures, currentProductFeatures)).toEqual([
      { feature: '10 hours', defaultFeatureValue: '✔️', currentFeatureValue: '✔️' },
      { feature: '1.2 kg', defaultFeatureValue: '✔️', currentFeatureValue: '✖️' },
      { feature: '15 inch', defaultFeatureValue: '✔️', currentFeatureValue: '✖️' },
      { feature: '1.3 kg', defaultFeatureValue: '✖️', currentFeatureValue: '✔️' }
    ]);
  });
});

