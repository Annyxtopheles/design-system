import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Tooltip } from './Tooltip';

describe('Tooltip Component', () => {
  it('does not render tooltip initially', () => {
    render(
      <Tooltip content="Tooltip Content">
        <button>Trigger</button>
      </Tooltip>
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('renders tooltip on mouse hover and hides on mouse leave', async () => {
    jest.useFakeTimers();
    render(
      <Tooltip content="Tooltip Content" delay={100}>
        <button>Trigger</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.mouseEnter(trigger);
    
    act(() => {
      jest.advanceTimersByTime(150);
    });

    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    fireEvent.mouseLeave(trigger);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    
    jest.useRealTimers();
  });

  it('hides on Escape key', () => {
    jest.useFakeTimers();
    render(
      <Tooltip content="Tooltip Content" delay={0}>
        <button>Trigger</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText('Trigger'));
    act(() => {
      jest.advanceTimersByTime(10);
    });
    
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    
    jest.useRealTimers();
  });
});
