import { expect, describe, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Auth from './Auth';

describe('Auth component', () => {
  it('Auth renders', () => {
    render(<Auth />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Authorization/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
  });
});
