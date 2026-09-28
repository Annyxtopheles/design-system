import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Popover from './Popover';

describe('Popover Component', () => {
  it('renders trigger and matches snapshot', () => {
    const { asFragment } = render(
      <Popover trigger={<button>Click me</button>} content={<div>Content</div>} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('opens and closes on trigger click', () => {
    render(<Popover trigger={<button>Click me</button>} content={<div>Content</div>} title="Title" />);
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Click me'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Click me'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('traps focus inside the popover', () => {
    render(
      <Popover 
        trigger={<button>Click me</button>} 
        content={<><input type="text" /><button>Inside</button></>} 
      />
    );
    
    fireEvent.click(screen.getByText('Click me'));
    
    const input = screen.getByRole('textbox');
    const insideBtn = screen.getByText('Inside');
    
    expect(input).toHaveFocus();
    
    // Tab from last to first
    insideBtn.focus();
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Tab' });
    expect(input).toHaveFocus();
    
    // Shift+Tab from first to last
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Tab', shiftKey: true });
    expect(insideBtn).toHaveFocus();
  });

  it('closes on Escape', () => {
    render(<Popover trigger={<button>Click me</button>} content={<div>Content</div>} />);
    fireEvent.click(screen.getByText('Click me'));
    
    const dialog = screen.getByRole('dialog');
    fireEvent.keyDown(dialog, { key: 'Escape' });
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
