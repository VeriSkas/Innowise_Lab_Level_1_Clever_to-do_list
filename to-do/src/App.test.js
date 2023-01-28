import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { expect, describe, it } from '@jest/globals';

import { Notification } from './components/UI/Notification/Notification';
import { Todos } from './pages/Todos/Todos';
import { Auth } from './pages/Auth/Auth';

const todos = [
  { id: 1, text: 'todo text 1', completed: true },
  { id: 2, text: 'todo text 2', completed: true },
  { id: 3, text: 'todo text 3', completed: false },
  { id: 4, text: 'todo text 4', completed: true },
  { id: 5, text: 'todo text 5', completed: false },
];

describe('Notification component', () => {
  it('renders Notification', () => {
    render(<Notification />);
    screen.debug();
  });
});

describe('Todos component', () => {
  it('Todos renders', () => {
    render(<Todos todos={todos} />, { wrapper: MemoryRouter });

    expect(screen.getByText(/todo text 5/)).toBeInTheDocument();
  });

  it('Todos renders without data', () => {
    render(<Todos />, { wrapper: MemoryRouter });

    expect(screen.queryByText(/todo text/)).toBeNull();
  });
});

describe('Auth component', () => {
  it('Auth renders', () => {
    render(<Auth />, { wrapper: MemoryRouter });
    screen.debug();
  });
});
