import '@testing-library/jest-dom';
import { describe, test, expect } from '@jest/globals';
import React from 'react';
import { render, screen } from '@testing-library/react';

import Helpful from '../components/Helpful';

describe('Helpful', () => {
  test('Should render the children provided', () => {
    render(<Helpful>Report</Helpful>);
    expect(screen.getByText('Report')).toBeInTheDocument();
  });
});
