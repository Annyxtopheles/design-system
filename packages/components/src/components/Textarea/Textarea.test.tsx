import React from 'react';
import { render, screen } from '@testing-library/react';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders without crashing', () => {
    render(<Textarea placeholder="Enter details" />);
    expect(screen.getByPlaceholderText('Enter details')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Textarea label="Notes" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('displays character count', () => {
    render(<Textarea value="Hello" showCharCount maxLength={10} onChange={()=>{}} />);
    expect(screen.getByText('5 / 10')).toBeInTheDocument();
  });

  it('meets accessibility standards', () => {
    render(<Textarea label="Bio" id="bio" error="Too short" />);
    const textarea = screen.getByLabelText('Bio');
    expect(textarea).toHaveAttribute('id', 'bio');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Too short');
  });
});
