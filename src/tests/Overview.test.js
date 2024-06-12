import { describe, test, expect } from '@jest/globals';
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import appReducer from '../reducers/appReducer';

describe('Overview', () => {
  test('sets selectedImage to specified image index', () => {
    expect(appReducer({}, { type: "setSelectedImage", payload: 1})).toEqual({selectedImage: 1});
  });
});
