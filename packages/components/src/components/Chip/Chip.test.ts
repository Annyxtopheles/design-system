import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Chip } from './Chip';

describe('Chip Component', () => {
  it('renders label correctly', () => {
    render(<Chip label="Test Chip" />);
    expect(screen.getByText('Test Chip')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const onClick = jest.fn();
    render(<Chip label="Clickable" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders remove button and handles remove event', () => {
    const onRemove = jest.fn();
    render(<Chip label="Removable" removable onRemove={onRemove} />);
    
    const removeBtn = screen.getByLabelText('Remove Removable');
    expect(removeBtn).toBeInTheDocument();
    
    fireEvent.click(removeBtn);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('applies disabled state', () => {
    render(<Chip label="Disabled" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
