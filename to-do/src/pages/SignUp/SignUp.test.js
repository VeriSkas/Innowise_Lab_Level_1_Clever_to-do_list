import { expect, describe, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { SignUp } from './SignUp';

describe('SignUp component', () => {
  it('SignUp renders', () => {
    render(<SignUp />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Repeat password/i)).toBeInTheDocument();
  });
});
