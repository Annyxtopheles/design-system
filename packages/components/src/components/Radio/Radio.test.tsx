import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Radio, RadioGroup } from './Radio';

describe('Radio and RadioGroup', () => {
  it('renders Radio without crashing', () => {
    render(<Radio label="Option 1" />);
    expect(screen.getByRole('radio', { name: /option 1/i })).toBeInTheDocument();
  });

  it('matches RadioGroup snapshot', () => {
    const { container } = render(
      <RadioGroup name="test" label="Test Group" options={[{ value: '1', label: 'One' }]} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('RadioGroup handles onChange', () => {
    const handleChange = jest.fn();
    render(
      <RadioGroup 
        name="letters" 
        options={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]} 
        onChange={handleChange} 
      />
    );
    const radioB = screen.getByRole('radio', { name: 'B' });
    fireEvent.click(radioB);
    expect(handleChange).toHaveBeenCalledWith('b');
  });

  it('RadioGroup meets accessibility standards', () => {
    render(
      <RadioGroup 
        name="letters" 
        label="Letters"
        error="Please select one"
        options={[{ value: 'a', label: 'A' }]} 
      />
    );
    const group = screen.getByRole('radiogroup', { name: 'Letters' });
    expect(group).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Please select one');
  });
});
