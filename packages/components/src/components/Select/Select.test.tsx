import React from 'react';
import { render, screen } from '@testing-library/react';
import { Select } from './Select';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
];

describe('Select', () => {
  it('renders without crashing', () => {
    render(<Select options={options} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Select label="Options" options={options} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('meets accessibility standards', () => {
    render(<Select label="Country" id="country" error="Required" options={options} />);
    const select = screen.getByLabelText('Country');
    expect(select).toHaveAttribute('id', 'country');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });
});
