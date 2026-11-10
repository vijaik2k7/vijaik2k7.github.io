import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Profile Component', () => {
  it('renders Vijai Rangan heading', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByText('Vijai Rangan').length).toBeGreaterThan(0);
  });

  it('renders Web Utilities section', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByText('Web Utilities').length).toBeGreaterThan(0);
  });
});
