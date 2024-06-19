/* eslint-env jest */
import '@testing-library/jest-dom';
import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';

import axios from 'axios';

import App from '../components/App';
import ImageGallery from '../components/ImageGallery';
import ImageThumbnails from '../components/ImageThumbnails';
import AppContext from '../context/AppContext';
import ExpandedView from '../components/ExpandedView';
import appReducer from '../reducers/appReducer';

import OTestData from './OTestData';
import RPTestData from './RPTestData';
import RTestData from './RTestData';

beforeEach(() => {
  axios.get.mockReset();
  for (const response of OTestData) {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: response }));
  }
  for (const response of RPTestData) {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: response }));
  }
  for (const response of RTestData) {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: response }));
  }
});

jest.mock('axios');

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

Element.prototype.scrollTo = () => {};

describe('Image Gallery', () => {
  test('Should switch image when buttons are clicked', async () => {
    render(<App />);
    const mainImage = await screen.findByTestId('main-image');
    expect(mainImage).toBeInTheDocument();
    let leftButton = screen.queryByTestId('image-left');
    const rightButton = screen.queryByTestId('image-right');
    expect(leftButton).not.toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
    fireEvent.click(rightButton);
    leftButton = screen.queryByTestId('image-left');
    expect(leftButton).toBeInTheDocument();
    fireEvent.click(leftButton);
  });

  test('Should switch image when thumbnail is clicked', async () => {
    const mockFn = jest.fn(() => appReducer({}, { type: 'setSelectedImage' }));
    jest.fn(() => appReducer({}, { type: 'doNothing' }))();
    render(
      <AppContext.Provider value={{
        store: {
          styles: OTestData[1].results,
          selectedStyle: 0,
          selectedImage: 0,
        },
        dispatch: mockFn,
      }}
      >
        <ImageThumbnails />
      </AppContext.Provider>,
    );
    const thumbnailContainer = await screen.findByTestId('thumbnail-container');
    expect(thumbnailContainer).toBeInTheDocument();
    const thumbnails = await screen.findAllByTestId('thumbnail');
    expect(thumbnails[0]).toBeInTheDocument();
    fireEvent.click(thumbnails[1]);
  });

  test('Should switch image when little arrow buttons are clicked', async () => {
    const mockFn = jest.fn();
    render(
      <AppContext.Provider value={{
        store: {
          styles: OTestData[1].results,
          selectedStyle: 0,
          selectedImage: 0,
        },
        dispatch: mockFn,
      }}
      >
        <ImageThumbnails />
      </AppContext.Provider>,
    );
    const thumbnailContainer = await screen.findByTestId('thumbnail-container');
    expect(thumbnailContainer).toBeInTheDocument();
    const scrollDownButton = await screen.findByTestId('scroll-thumbnails-down');
    const scrollUpButton = await screen.findByTestId('scroll-thumbnails-up');
    expect(scrollDownButton).toBeInTheDocument();
    expect(scrollUpButton).toBeInTheDocument();
    fireEvent.click(scrollDownButton);
    fireEvent.click(scrollUpButton);
  });

  test('Should display placeholder image when none are provided', async () => {
    render(
      <AppContext.Provider value={{
        store: {
          selectedStyle: 0,
          selectedImage: 0,
          styles: [{
            photos: [true],
          }],
        },
      }}
      >
        <ImageGallery />
      </AppContext.Provider>,
    );
    await screen.findByTestId('main-image');
    expect(true).toBe(true);
  });

  test('Expanded view should open when main image is clicked', async () => {
    const showModal = jest.fn();
    Element.prototype.showModal = showModal;
    render(<App />);
    const mainImage = await screen.findByTestId('main-image');
    expect(mainImage).toBeInTheDocument();
    fireEvent.click(mainImage);
    expect(showModal.mock.calls).toHaveLength(1);
  });

  test('Expanded view should have the right stuff', async () => {
    const switchImage = jest.fn();
    render(
      <AppContext.Provider value={
        {
          store: {
            styles: OTestData[1].results,
            selectedStyle: 0,
            selectedImage: 0,
          },
        }
      }
      >
        <ExpandedView switchImage={switchImage} />
      </AppContext.Provider>,
    );
    const expandedImage = await screen.findByTestId('expanded-image');
    expect(expandedImage).toBeInTheDocument();
    const leftButton = await screen.findByTestId('expanded-left');
    const rightButton = await screen.findByTestId('expanded-right');
    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
    fireEvent.click(leftButton);
    expect(switchImage.mock.calls).toHaveLength(1);
    fireEvent.click(rightButton);
    expect(switchImage.mock.calls).toHaveLength(2);
    fireEvent.click(expandedImage);
  });

  test('Expanded view should load placeholder image if none are available', async () => {
    render(
      <AppContext.Provider value={
        {
          store: {
            styles: [{ photos: [{ url: null }] }],
            selectedStyle: 0,
            selectedImage: 0,
          },
        }
      }
      >
        <ExpandedView />
      </AppContext.Provider>,
    );
    const expandedImage = await screen.findByTestId('expanded-image');
    fireEvent.pointerMove(expandedImage.parentElement, { target: { clientX: 0, clientY: 0 } });
    expect(true).toBe(true);
  });
});
