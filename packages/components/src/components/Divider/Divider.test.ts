import React from 'react';
import { render, screen } from '@testing-library/react';
import { Divider } from './Divider';

describe('Divider Component', () => {
  it('renders horizontal solid divider by default', () => {
    render(<Divider />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('ds-Divider--horizontal');
    expect(divider).toHaveClass('ds-Divider--variant-solid');
  });

  it('renders vertical divider', () => {
    render(<Divider orientation="vertical" />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('ds-Divider--vertical');
    expect(divider).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('renders with label', () => {
    render(<Divider label="OR" />);
    expect(screen.getByText('OR')).toBeInTheDocument();
  });

  it('applies custom color', () => {
    render(<Divider color="red" />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveStyle({ borderColor: 'red' });
  });
});
