import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders without crashing', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByRole('checkbox', { name: /accept terms/i })).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Checkbox label="Subscribe" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('can be toggled', () => {
    const handleChange = jest.fn();
    render(<Checkbox label="Test" onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();
  });

  it('meets accessibility standards for error', () => {
    render(<Checkbox label="Agree" id="agree" error="Must agree" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Must agree');
  });
});
