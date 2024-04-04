import { render, screen } from '@testing-library/react';
import HeaderSearch from './HeaderSearch';

test('renders learn react link', () => {
  render(<HeaderSearch />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
