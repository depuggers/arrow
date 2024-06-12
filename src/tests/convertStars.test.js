import { describe, test, expect } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import convertStars from '../lib/convertStars';

describe('convertStars', () => {
  test('returns empty object when invoked without a valid object that contains a "ratings" property', () => {
    expect(() => convertStars('test').toHaveReturnedWith({}));
  });
  test('logs "invadlid data" when invoked without an argument', () => {
    expect(() => console.log(convertStars('test')).toEqual('invalid data'));
  });
});

// const convertStars = (data) => {
//   if (!data || !data.ratings) {
//     console.error('invalid data');
//     return {};
//   }
//   const stars = Object.fromEntries(Object.entries(data.ratings).map(([k, v]) => [`stars${k}`, parseInt(v)]));
//   return stars;
// };


// export default convertStars;