/* eslint-env jest */
import '@testing-library/jest-dom';
import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';

import axios from 'axios';

import App from '../components/App';
import AddQuestion from '../components/AddQuestion';
import AppContext from '../context/AppContext';

import testData from './testData';

jest.mock('axios');

beforeEach(() => {
  for (const response of testData) {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: response }));
  }
});

Element.prototype.scrollTo = () => {};
// console.log = jest.fn();

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
});
