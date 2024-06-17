/* eslint-env jest */
import '@testing-library/jest-dom';
import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';

import axios from 'axios';

import App from '../components/App';
import QnAItem from '../components/QnAItem';

import AppContext from '../context/AppContext';

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

describe('Q&A Item', () => {
  test('Clicking Add Answer should open modal', async () => {
    const showModal = jest.fn();
    render(
      <AppContext.Provider value={{
        showModal,
        dispatch: showModal,
        store: {
          helpfulQs: [],
          helpfulAs: [],
          reportedAs: [],
        },
      }}
      >
        <QnAItem question={testData[2].results[0]} />
      </AppContext.Provider>,
    );
    const [addAnswer] = await screen.findAllByText(/add answer/i);
    expect(addAnswer).toBeInTheDocument();
    fireEvent.click(addAnswer);
  });

  test('Clicking MORE ANSWERS should show MORE ANSWERS', async () => {
    const showModal = jest.fn();
    render(
      <AppContext.Provider value={{
        showModal,
        dispatch: showModal,
        store: {
          helpfulQs: [],
          helpfulAs: [],
          reportedAs: [],
        },
      }}
      >
        <QnAItem question={testData[2].results[0]} />
      </AppContext.Provider>,
    );
    const [moreAnswer] = await screen.findAllByText(/load more answer/i);
    expect(moreAnswer).toBeInTheDocument();
    fireEvent.click(moreAnswer);
  });

  test('...unless there\'s no MORE ANSWERS to show', async () => {
    const showModal = jest.fn();
    render(
      <AppContext.Provider value={{
        showModal,
        dispatch: showModal,
        store: {
          helpfulQs: [],
          helpfulAs: [],
          reportedAs: [],
        },
      }}
      >
        <QnAItem question={testData[2].results[1]} />
      </AppContext.Provider>,
    );
    const [moreAnswer] = await screen.findAllByText(/load more answer/i);
    expect(moreAnswer).toBeInTheDocument();
    fireEvent.click(moreAnswer);
    fireEvent.click(moreAnswer);
  });

  test('Clicking "yes" should mark question helpful', async () => {
    axios.put.mockImplementationOnce(() => Promise.resolve({ status: 204 }));
    render(<App />);
    const [helpfulButton] = await screen.findAllByText('Yes');
    expect(helpfulButton).toBeInTheDocument();
    fireEvent.click(helpfulButton);
    await waitFor(() => expect(axios.put).toHaveBeenCalled());
  });

  test('...unless you\'ve already done that', async () => {
    const mockFn = jest.fn();
    // axios.put.mockImplementationOnce(() => Promise.resolve({ status: 204 }));
    render(
      <AppContext.Provider value={{
        showModal: mockFn,
        dispatch: mockFn,
        store: {
          helpfulQs: [647077],
          helpfulAs: [],
          reportedAs: [],
        },
      }}
      >
        <QnAItem question={testData[2].results[0]} />
      </AppContext.Provider>,
    );
    const [helpfulButton] = await screen.findAllByText('Yes');
    expect(helpfulButton).toBeInTheDocument();
    fireEvent.click(helpfulButton);
    // await waitFor(() => expect(axios.put).toHaveBeenCalled());
  });

  test('...or the server is down', async () => {
    axios.put.mockImplementationOnce(() => Promise.resolve({ status: 404 }));
    render(<App />);
    const helpfulButtons = await screen.findAllByText('Yes');
    const helpfulButton = helpfulButtons[3];
    expect(helpfulButton).toBeInTheDocument();
    fireEvent.click(helpfulButton);
    await waitFor(() => expect(axios.put).toHaveBeenCalled());
  });

  test('Clicking "yes" should mark answer helpful', async () => {
    axios.put.mockImplementationOnce(() => Promise.resolve({ status: 204 }));
    render(<App />);
    const helpfulButtons = await screen.findAllByText('Yes');
    const helpfulButton = helpfulButtons[1];
    expect(helpfulButton).toBeInTheDocument();
    fireEvent.click(helpfulButton);
    await waitFor(() => expect(axios.put).toHaveBeenCalled());
  });

  test('...unless you\'ve already done that', async () => {
    const mockFn = jest.fn();
    // axios.put.mockImplementationOnce(() => Promise.resolve({ status: 204 }));
    render(
      <AppContext.Provider value={{
        showModal: mockFn,
        dispatch: mockFn,
        store: {
          helpfulQs: [647077],
          helpfulAs: [5993475],
          reportedAs: [],
        },
      }}
      >
        <QnAItem question={testData[2].results[0]} />
      </AppContext.Provider>,
    );
    const helpfulButtons = await screen.findAllByText('Yes');
    const helpfulButton = helpfulButtons[1];
    expect(helpfulButton).toBeInTheDocument();
    fireEvent.click(helpfulButton);
    // await waitFor(() => expect(axios.put).toHaveBeenCalled());
  });

  test('...or the server is down', async () => {
    axios.put.mockImplementationOnce(() => Promise.resolve({ status: 404 }));
    render(<App />);
    const helpfulButtons = await screen.findAllByText('Yes');
    const helpfulButton = helpfulButtons[2];
    expect(helpfulButton).toBeInTheDocument();
    fireEvent.click(helpfulButton);
    await waitFor(() => expect(axios.put).toHaveBeenCalled());
  });

  test('Clicking "report" should report', async () => {
    render(<App />);
    const reportButtons = await screen.findAllByText('Report');
    const reportButton = reportButtons[0];
    expect(reportButton).toBeInTheDocument();
    fireEvent.click(reportButton);
    const reportedButton = await screen.findByText('Reported');
    expect(reportedButton).toBeInTheDocument();
  });

  test('...unless you\'ve already done that', async () => {
    const mockFn = jest.fn();
    render(
      <AppContext.Provider value={{
        showModal: mockFn,
        dispatch: mockFn,
        store: {
          helpfulQs: [647077],
          helpfulAs: [5993475],
          reportedAs: [59934],
        },
      }}
      >
        <QnAItem question={testData[2].results[0]} />
      </AppContext.Provider>,
    );
    const reportButton = await screen.findByText('Reported');
    expect(reportButton).toBeInTheDocument();
    fireEvent.click(reportButton);
    expect(mockFn.mock.calls).toHaveLength(0);
  });
});
