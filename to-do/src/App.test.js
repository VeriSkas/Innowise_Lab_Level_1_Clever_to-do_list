import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, it } from '@jest/globals';

import { App } from './App';

describe('App component', () => {
  it('App renders', () => {
    render(<App />, { wrapper: MemoryRouter });
    screen.debug();
  });
});
