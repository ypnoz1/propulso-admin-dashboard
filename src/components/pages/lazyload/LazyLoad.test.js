import { render, screen } from '@testing-library/react';
import LazyLoad from './LazyLoad';

test('renders learn react link', () => {
  render(<LazyLoad />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
