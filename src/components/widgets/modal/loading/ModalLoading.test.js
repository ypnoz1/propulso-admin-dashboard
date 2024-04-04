import { render, screen } from '@testing-library/react';
import ModalLoading from './ModalLoading';

test('renders learn react link', () => {
  render(<ModalLoading />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
