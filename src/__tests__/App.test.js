import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders dashboard title', () => {
  render(<App />);
  const el = screen.getByText(/Assignment Tracker/i);
  expect(el).toBeInTheDocument();
});

test('student public route renders submission form', () => {
  // simulate hash
  window.location.hash = '#student-public';
  render(<App />);
  const header = screen.getByText(/Student Submission/i);
  expect(header).toBeInTheDocument();
});
