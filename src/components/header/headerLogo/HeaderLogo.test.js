import { render, screen } from '@testing-library/react';
import HeaderLogo from './HeaderLogo';

test('renders learn react link', () => {
  render(<HeaderLogo />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
