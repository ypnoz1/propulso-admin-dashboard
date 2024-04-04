import { render, screen } from '@testing-library/react';
import BoxChartLine from './BoxChartLine';

test('renders learn react link', () => {
  render(<BoxChartLine />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
