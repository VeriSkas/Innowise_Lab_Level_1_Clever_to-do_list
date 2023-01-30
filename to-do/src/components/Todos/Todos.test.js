import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { expect, describe, it } from '@jest/globals';

import Todos from './Todos';

const todos = [
  { id: 1, text: 'todo text 1', completed: true },
  { id: 2, text: 'todo text 2', completed: true },
  { id: 3, text: 'todo text 3', completed: false },
  { id: 4, text: 'todo text 4', completed: true },
  { id: 5, text: 'todo text 5', completed: false },
];

describe('Todos component', () => {
  it('Todos renders', () => {
    render(<Todos todos={todos} />, { wrapper: MemoryRouter });

    expect(screen.getByText(/todo text 5/i)).toBeInTheDocument();
  });

  it('Todos renders without data', () => {
    render(<Todos />, { wrapper: MemoryRouter });

    expect(screen.queryByText(/todo text/i)).toBeNull();
  });
});
