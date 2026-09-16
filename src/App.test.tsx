import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Profile & Reading Hub Component', () => {
  it('renders Vijai Rangan heading', () => {
    render(<App />);
    expect(screen.getAllByText('Vijai Rangan').length).toBeGreaterThan(0);
  });

  it('renders Weekend Readings section', () => {
    render(<App />);
    expect(screen.getByText('Weekend Readings & Notes')).toBeTruthy();
  });

  it('renders Hobby Utilities section', () => {
    render(<App />);
    expect(screen.getByText('Hobby Utilities & Functional Builds')).toBeTruthy();
  });
});
