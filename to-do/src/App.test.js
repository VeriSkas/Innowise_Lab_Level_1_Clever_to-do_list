import { render, screen } from '@testing-library/react';
import { test } from '@jest/globals';

import { Notification } from './components/UI/Notification/Notification';

test('renders App text link', () => {
  render(<Notification />);
  screen.debug();
});
