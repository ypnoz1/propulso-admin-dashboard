import { render, screen } from '@testing-library/react';
import DashBoard from './DashBoard';

test('renders learn react link', () => {
  render(<DashBoard />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
