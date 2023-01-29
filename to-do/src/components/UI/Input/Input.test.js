import { expect, describe, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from './Input';

const onChange = jest.fn();

describe('Input component', () => {
  it('Input renders', () => {
    render(<Input label="Email" />);
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('onChange works', () => {
    render(<Input onChange={onChange} />);
    userEvent.type(screen.getByRole('textbox'), 'test@mail.ru');

    expect(onChange).toHaveBeenCalledTimes(12);
  });
});
