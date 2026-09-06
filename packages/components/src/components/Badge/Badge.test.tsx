import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders without crashing', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Badge variant="success" size="lg">Success</Badge>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders dot variant correctly', () => {
    render(<Badge dot variant="error" data-testid="dot-badge" />);
    const badge = screen.getByTestId('dot-badge');
    expect(badge).toHaveClass('ds-Badge--dot');
    expect(badge).toHaveClass('ds-Badge--error');
  });

  it('handles remove click', () => {
    const handleRemove = jest.fn();
    render(<Badge removable onRemove={handleRemove}>Tag</Badge>);
    
    const removeBtn = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeBtn);
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });
});
