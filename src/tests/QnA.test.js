/* eslint-env jest */
import '@testing-library/jest-dom';
import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';

import axios from 'axios';

import App from '../components/App';
import AddQuestion from '../components/AddQuestion';
import AddAnswer from '../components/AddAnswer';
import AppContext from '../context/AppContext';

import markText from '../lib/markText';

import testData from './testData';

jest.mock('axios');

beforeEach(() => {
  for (const response of testData) {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: response }));
  }
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
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

describe('Q&A', () => {
  test('Typing more than 3 characters in the search box should filter results', async () => {
    render(<App />);
    const firstQuestion = await screen.findByText(/vhvb/i);
    expect(firstQuestion).toBeInTheDocument();
    const search = screen.getByTestId('qna-search');
    expect(search).toBeInTheDocument();
    fireEvent.change(search, { target: { value: 'we ' } });
  });

  test('Clicking MORE QUESTIONS should load MORE QUESTIONS', async () => {
    render(<App />);
    const moreButton = await screen.findByTestId('more-questions');
    expect(moreButton).toBeInTheDocument();
    fireEvent.click(moreButton);
  });

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
        updateQnA: jest.fn(),
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
        updateQnA: jest.fn(),
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
        updateQnA: jest.fn(),
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
        updateQnA: jest.fn(),
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
        updateQnA: jest.fn(),
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

  test('Should highlight searched text', async () => {
    expect(markText('hello hello', 'hel').length).toBeGreaterThan(0);
  });
});
