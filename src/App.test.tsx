import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Profile Component', () => {
  it('renders Vijai Rangan heading', () => {
    render(<App />);
    expect(screen.getAllByText('Vijai Rangan').length).toBeGreaterThan(0);
  });
});
