import { render, screen } from '@testing-library/react';
import BoxChartBar from './BoxChartBar';

test('renders learn react link', () => {
  render(<BoxChartBar />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
