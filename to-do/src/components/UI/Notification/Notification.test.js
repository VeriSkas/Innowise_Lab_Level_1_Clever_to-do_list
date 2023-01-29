import { render, screen } from '@testing-library/react';
import { expect, describe, it } from '@jest/globals';

import { Notification } from './Notification';

describe('Notification component', () => {
  it('Notification renders', () => {
    render(<Notification text="You won" />);

    expect(screen.getByText(/Success/i)).toBeInTheDocument();
  });

  it('notification type works', () => {
    render(<Notification type="Error" />);

    expect(screen.getByText(/Error/i)).toBeInTheDocument();
  });
});
