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
