import React from 'react';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders without crashing', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Spinner size="xl" color="primary" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('has accessible label', () => {
    render(<Spinner label="Processing payment..." />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', 'Processing payment...');
    expect(screen.getByText('Processing payment...')).toBeInTheDocument();
  });

  it('renders overlay when prop is true', () => {
    const { container } = render(<Spinner overlay />);
    expect(container.firstChild).toHaveClass('ds-Spinner-overlay');
  });
});
