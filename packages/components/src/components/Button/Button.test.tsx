import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders without crashing', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Button variant="primary">Snapshot</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('handles onClick behavior', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables interaction when loading', () => {
    const handleClick = jest.fn();
    render(<Button loading onClick={handleClick}>Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('meets accessibility standards', () => {
    render(<Button aria-label="Close">X</Button>);
    const button = screen.getByRole('button', { name: /close/i });
    expect(button).toBeInTheDocument();
  });
});
