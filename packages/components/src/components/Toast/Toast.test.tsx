import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToastProvider, useToast } from './Toast';

const TestComponent = () => {
  const { add, dismiss, clear } = useToast();
  return (
    <div>
      <button onClick={() => add({ message: 'Success!', variant: 'success' })}>Add Toast</button>
      <button onClick={() => clear()}>Clear</button>
    </div>
  );
};

describe('Toast Component', () => {
  it('adds and renders a toast', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Add Toast'));
    expect(screen.getByText('Success!')).toBeInTheDocument();
  });

  it('clears toasts', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Add Toast'));
    expect(screen.getByText('Success!')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Clear'));
    expect(screen.queryByText('Success!')).not.toBeInTheDocument();
  });

  it('dismisses toast on close click', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Add Toast'));
    
    const closeBtn = screen.getByLabelText('Dismiss toast');
    fireEvent.click(closeBtn);
    
    expect(screen.queryByText('Success!')).not.toBeInTheDocument();
  });
});
