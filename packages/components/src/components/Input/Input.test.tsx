import React from 'react';
import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders without crashing', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Input label="Username" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('links label and input correctly for accessibility', () => {
    render(<Input label="Email" id="email-input" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'email-input');
  });

  it('displays error and sets aria-invalid', () => {
    render(<Input label="Name" error="Name is required" />);
    const input = screen.getByLabelText('Name');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Name is required');
  });
  
  it('links error and hint via aria-describedby', () => {
    render(<Input label="Name" hint="First name only" id="test-input" />);
    const input = screen.getByLabelText('Name');
    expect(input).toHaveAttribute('aria-describedby', 'test-input-hint');
    expect(screen.getByText('First name only')).toBeInTheDocument();
  });
});
