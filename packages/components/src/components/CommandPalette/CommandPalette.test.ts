import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CommandPalette from './CommandPalette';

const mockItems = [
  { id: '1', label: 'Create new file', group: 'File', onSelect: jest.fn(), shortcut: 'Ctrl+N' },
  { id: '2', label: 'Save file', group: 'File', onSelect: jest.fn() },
  { id: '3', label: 'Preferences', group: 'Settings', onSelect: jest.fn() },
];

describe('CommandPalette Component', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <CommandPalette open={false} onClose={() => {}} items={mockItems} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders items and groups when open', () => {
    render(<CommandPalette open={true} onClose={() => {}} items={mockItems} />);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('File')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Create new file')).toBeInTheDocument();
    expect(screen.getByText('Ctrl+N')).toBeInTheDocument();
  });

  it('filters items based on search query', () => {
    render(<CommandPalette open={true} onClose={() => {}} items={mockItems} />);
    
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'Save' } });
    
    expect(screen.getByText('Save file')).toBeInTheDocument();
    expect(screen.queryByText('Create new file')).not.toBeInTheDocument();
  });

  it('calls onSelect and onClose on item click', () => {
    const handleClose = jest.fn();
    render(<CommandPalette open={true} onClose={handleClose} items={mockItems} />);
    
    fireEvent.click(screen.getByText('Save file'));
    
    expect(mockItems[1].onSelect).toHaveBeenCalled();
    expect(handleClose).toHaveBeenCalled();
  });

  it('supports keyboard navigation', () => {
    const handleClose = jest.fn();
    render(<CommandPalette open={true} onClose={handleClose} items={mockItems} />);
    
    const dialog = screen.getByRole('dialog');
    
    // Arrow down to second item
    fireEvent.keyDown(dialog, { key: 'ArrowDown' });
    // Select it
    fireEvent.keyDown(dialog, { key: 'Enter' });
    
    expect(mockItems[1].onSelect).toHaveBeenCalled();
    expect(handleClose).toHaveBeenCalled();
  });
});
