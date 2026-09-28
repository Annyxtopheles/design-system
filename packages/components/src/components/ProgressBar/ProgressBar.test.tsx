import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar Component', () => {
  it('renders linear progress bar by default', () => {
    render(<ProgressBar value={50} />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuenow', '50');
    expect(progress).toHaveClass('ds-ProgressBar-linear');
  });

  it('renders circular progress bar', () => {
    render(<ProgressBar variant="circular" value={75} />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveClass('ds-ProgressBar-circular');
  });

  it('shows value when showValue is true', () => {
    render(<ProgressBar value={30} showValue />);
    expect(screen.getByText('30%')).toBeInTheDocument();
  });

  it('handles indeterminate state correctly', () => {
    render(<ProgressBar indeterminate />);
    const progress = screen.getByRole('progressbar');
    expect(progress).not.toHaveAttribute('aria-valuenow');
    expect(progress).toHaveClass('ds-ProgressBar--indeterminate');
  });
});
