/* eslint-env jest */
import '@testing-library/jest-dom';
import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';

import axios from 'axios';

import App from '../components/App';

import testData from './testData';

jest.mock('axios');

beforeEach(() => {
  for (const response of testData) {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: response }));
  }
});

Element.prototype.scrollTo = () => {};

describe('Overview', () => {
  test('Style selector should have one child per style', async () => {
    render(<App />);
    const styleSelector = await screen.findByTestId('style-selector');
    expect(styleSelector.children.length).toBe(6);
  });

  test('Add to cart button should be disabled', async () => {
    render(<App />);
    expect(await screen.findByText(/cart/i)).toBeDisabled();
  });
});
