import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar Component', () => {
  it('renders initials when no src is provided', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders single initial for single name', () => {
    render(<Avatar name="John" />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('renders image when src is provided and valid', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="Avatar image" />);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('falls back to initials when image fails to load', () => {
    render(<Avatar src="https://example.com/invalid.jpg" name="Jane Doe" />);
    const img = screen.getByRole('img');
    fireEvent.error(img);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders status dot correctly', () => {
    render(<Avatar name="Alice" status="online" />);
    expect(screen.getByLabelText('Status: online')).toBeInTheDocument();
  });

  it('renders custom badge correctly', () => {
    render(<Avatar name="Alice" badge={<span data-testid="badge">1</span>} />);
    expect(screen.getByTestId('badge')).toBeInTheDocument();
  });
});
