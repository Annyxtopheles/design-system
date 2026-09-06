import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DropdownMenu from './DropdownMenu';

const mockItems = [
  { id: '1', label: 'Item 1', onClick: jest.fn() },
  { id: '2', label: 'Item 2', shortcut: 'Ctrl+S' },
  { id: 'sep1', label: '', separator: true },
  { id: '3', label: 'Item 3', disabled: true }
];

describe('DropdownMenu Component', () => {
  it('renders trigger and matches snapshot', () => {
    const { asFragment } = render(
      <DropdownMenu trigger={<button>Menu</button>} items={mockItems} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('opens menu on trigger click', () => {
    render(<DropdownMenu trigger={<button>Menu</button>} items={mockItems} />);
    
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Menu'));
    
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Ctrl+S')).toBeInTheDocument();
  });

  it('closes menu on item click', () => {
    render(<DropdownMenu trigger={<button>Menu</button>} items={mockItems} />);
    
    fireEvent.click(screen.getByText('Menu'));
    fireEvent.click(screen.getByText('Item 1'));
    
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(mockItems[0].onClick).toHaveBeenCalled();
  });

  it('does not close or click disabled items', () => {
    const onClick = jest.fn();
    const items = [{ id: '1', label: 'Disabled', disabled: true, onClick }];
    render(<DropdownMenu trigger={<button>Menu</button>} items={items} />);
    
    fireEvent.click(screen.getByText('Menu'));
    fireEvent.click(screen.getByText('Disabled'));
    
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('handles keyboard navigation', () => {
    render(<DropdownMenu trigger={<div data-testid="trigger">Menu</div>} items={mockItems} />);
    
    const trigger = screen.getByTestId('trigger');
    trigger.focus();
    fireEvent.keyDown(trigger, { key: 'Enter' });
    
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    const menu = screen.getByRole('menu');
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    // Item 2
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    
    fireEvent.keyDown(menu, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
