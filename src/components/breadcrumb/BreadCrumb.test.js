import { render, screen } from '@testing-library/react';
import BreadCrumb from './BreadCrumb';

test('renders learn react link', () => {
  render(<BreadCrumb />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
