import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders without crashing', () => {
    render(<Switch label="Airplane Mode" />);
    expect(screen.getByRole('switch', { name: /airplane mode/i })).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Switch size="lg" labelPosition="left" label="Dark Mode" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('toggles with space and enter', () => {
    const handleChange = jest.fn();
    render(<Switch label="Toggle" onChange={handleChange} />);
    const switchEl = screen.getByRole('switch');
    
    switchEl.focus();
    fireEvent.keyDown(switchEl, { key: ' ' });
    expect(handleChange).toHaveBeenCalled();

    fireEvent.keyDown(switchEl, { key: 'Enter' });
    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it('has correct ARIA attributes', () => {
    render(<Switch label="On" checked onChange={() => {}} />);
    const switchEl = screen.getByRole('switch');
    expect(switchEl).toHaveAttribute('aria-checked', 'true');
  });
});
