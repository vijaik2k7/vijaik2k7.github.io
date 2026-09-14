import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Profile Component', () => {
  it('renders Vijai Kasthuri Rangan heading', () => {
    render(<App />);
    expect(screen.getAllByText('Vijai Kasthuri Rangan').length).toBeGreaterThan(0);
  });
});
