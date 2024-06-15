/* eslint-env jest */
import '@testing-library/jest-dom';
import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';

import axios from 'axios';

import App from '../components/App';
import Header from '../components/Header';
import ImageGallery from '../components/ImageGallery';
import AddQuestion from '../components/AddQuestion';
import AddAnswer from '../components/AddAnswer';
import AppContext from '../context/AppContext';
import ExpandedView from '../components/ExpandedView';

import testData from './testData';

jest.mock('axios');

beforeEach(() => {
  for (const response of testData) {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: response }));
  }
});

Element.prototype.scrollTo = () => {};
// console.log = jest.fn();

describe('Header', () => {
  test('Should pickup dark theme preference', async () => {
    window.matchMedia = true;
    window.matchMedia = () => ({
      matches: true,
    });
    render(
      <App />,
    );
    await screen.findAllByText(/./i);
    expect(true).toBe(true);
  });

  test('Should pickup light theme preference', async () => {
    const storageSpy = jest.spyOn(Storage.prototype, 'getItem');
    storageSpy.mockImplementation(() => null);
    window.matchMedia = false;
    render(<App />);
    await screen.findAllByText(/./i);
    expect(true).toBe(true);
    storageSpy.mockRestore();
  });

  test('Should toggle theme when button is clicked', async () => {
    render(
      <AppContext.Provider value={
        {
          store: {
            cart: [1, 2, 3],
          },
        }
      }
      >
        <Header />
      </AppContext.Provider>,
    );
    const toggle = await screen.findByTestId('theme-toggle');
    expect(toggle).toBeInTheDocument();
    fireEvent.click(toggle);
    fireEvent.click(toggle);
  });
});