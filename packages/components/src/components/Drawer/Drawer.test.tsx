import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Drawer from './Drawer';

describe('Drawer Component', () => {
  beforeEach(() => {
    // Mock createPortal since it can be tricky in some test environments
    // Actually jsdom supports it fine, we will let it render normally
  });

  it('renders nothing when closed', () => {
    const { container } = render(
      <Drawer open={false} onClose={() => {}}>Content</Drawer>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders correctly when open', () => {
    render(
      <Drawer open={true} onClose={() => {}} title="Test Drawer" footer="Footer">
        Body Content
      </Drawer>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Drawer')).toBeInTheDocument();
    expect(screen.getByText('Body Content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(<Drawer open={true} onClose={handleClose}>Content</Drawer>);
    
    fireEvent.click(screen.getByLabelText('Close drawer'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on Escape key', () => {
    const handleClose = jest.fn();
    render(<Drawer open={true} onClose={handleClose}>Content</Drawer>);
    
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('prevents body scroll when open', () => {
    render(<Drawer open={true} onClose={() => {}}>Content</Drawer>);
    expect(document.body.style.overflow).toBe('hidden');
  });
});
