import { render, screen } from '@testing-library/react';
import BoxContentOne from './BoxContentOne';

test('renders learn react link', () => {
  render(<BoxContentOne />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
