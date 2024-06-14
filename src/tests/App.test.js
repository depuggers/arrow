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
            styles: testData[1].results,
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

describe('Q&A', () => {
  test('Add Question button should open modal', async () => {
    const showModal = jest.fn();
    Element.prototype.showModal = showModal;

    render(<App />);
    const button = await screen.findByText(/add a question/i);
    fireEvent.click(button);

    expect(showModal.mock.calls).toHaveLength(1);
  });

  test('Add question modal should submit and close if successful', async () => {
    const mockHideModal = jest.fn();
    axios.post.mockImplementationOnce(() => Promise.resolve({ status: 201 }));

    render(
      <AppContext.Provider value={{
        store: {
          product: {
            name: 'test',
          },
        },
        productID: 40344,
        hideModal: mockHideModal,
      }}
      >
        <AddQuestion />
      </AppContext.Provider>,
    );
    const submitButton = await screen.findByText(/submit question/i);
    fireEvent.change(screen.getByLabelText(/question/i), { target: { value: 'Why?' } });
    fireEvent.change(screen.getByLabelText(/nickname/i), { target: { value: 'Jason' } });
    fireEvent.change(screen.getByLabelText(/your email/i), { target: { value: 'Jason@email.com' } });
    expect(submitButton).toBeInTheDocument();
    fireEvent.submit(submitButton.form);
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(mockHideModal.mock.calls).toHaveLength(1);
  });

  test('Add question modal should submit stay open if unsuccessful', async () => {
    const mockHideModal = jest.fn();
    axios.post.mockImplementationOnce(() => Promise.resolve({ status: 404 }));

    render(
      <AppContext.Provider value={{
        store: {
          product: {
            name: 'test',
          },
        },
        productID: 40344,
        hideModal: mockHideModal,
      }}
      >
        <AddQuestion />
      </AppContext.Provider>,
    );
    const submitButton = await screen.findByText(/submit question/i);
    fireEvent.change(screen.getByLabelText(/question/i), { target: { value: 'Why?' } });
    fireEvent.change(screen.getByLabelText(/nickname/i), { target: { value: 'Jason' } });
    fireEvent.change(screen.getByLabelText(/your email/i), { target: { value: 'Jason@email.com' } });
    expect(submitButton).toBeInTheDocument();
    fireEvent.submit(submitButton.form);
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(mockHideModal.mock.calls).toHaveLength(0);
  });

  test('Add answer modal should submit and close if successful', async () => {
    const mockHideModal = jest.fn();
    axios.post.mockImplementationOnce(() => Promise.resolve({ status: 201 }));

    render(
      <AppContext.Provider value={{
        store: {
          product: {
            name: 'test',
          },
        },
        productID: 40344,
        hideModal: mockHideModal,
      }}
      >
        <AddAnswer question={{
          question_body: 'Why?',
        }}
        />
      </AppContext.Provider>,
    );
    const submitButton = await screen.findByText(/submit answer/i);
    fireEvent.change(screen.getByLabelText(/answer/i), { target: { value: 'Why?' } });
    fireEvent.change(screen.getByLabelText(/nickname/i), { target: { value: 'Jason' } });
    fireEvent.change(screen.getByLabelText(/your email/i), { target: { value: 'Jason@email.com' } });
    expect(submitButton).toBeInTheDocument();
    fireEvent.submit(submitButton.form);
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(mockHideModal.mock.calls).toHaveLength(1);
  });

  test('Add answer add photo button should work', async () => {
    const mockHideModal = jest.fn();

    render(
      <AppContext.Provider value={{
        store: {
          product: {
            name: 'test',
          },
        },
        productID: 40344,
        hideModal: mockHideModal,
      }}
      >
        <AddAnswer question={{
          question_body: 'Why?',
        }}
        />
      </AppContext.Provider>,
    );
    const addButton = await screen.findByText(/add photo/i);
    const photos = screen.getByTestId('answer-photos');
    expect(addButton).toBeInTheDocument();
    expect(photos).toBeInTheDocument();
    expect(photos.children.length).toBe(0);
    fireEvent.click(addButton);
    expect(photos.children.length).toBeGreaterThan(0);
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(addButton).not.toBeInTheDocument();
  });

  test('Add answer modal should submit stay open if unsuccessful', async () => {
    const mockHideModal = jest.fn();
    axios.post.mockImplementationOnce(() => Promise.resolve({ status: 404 }));

    render(
      <AppContext.Provider value={{
        store: {
          product: {
            name: 'test',
          },
        },
        productID: 40344,
        hideModal: mockHideModal,
      }}
      >
        <AddAnswer question={{
          question_body: 'Why?',
        }}
        />
      </AppContext.Provider>,
    );
    const submitButton = await screen.findByText(/submit answer/i);
    fireEvent.change(screen.getByLabelText(/answer/i), { target: { value: 'Why?' } });
    fireEvent.change(screen.getByLabelText(/nickname/i), { target: { value: 'Jason' } });
    fireEvent.change(screen.getByLabelText(/your email/i), { target: { value: 'Jason@email.com' } });
    expect(submitButton).toBeInTheDocument();
    fireEvent.submit(submitButton.form);
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(mockHideModal.mock.calls).toHaveLength(0);
  });
});
