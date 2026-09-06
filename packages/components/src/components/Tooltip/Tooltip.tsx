import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Tooltip.scss';

export interface TooltipProps {
  /** The element that triggers the tooltip */
  children: React.ReactElement;
  /** Content of the tooltip */
  content: string | React.ReactNode;
  /** Position relative to the trigger */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay in milliseconds before showing */
  delay?: number;
  /** Max width of the tooltip */
  maxWidth?: number | string;
  /** Whether the tooltip is disabled */
  disabled?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  placement = 'top',
  delay = 300,
  maxWidth = 250,
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const show = useCallback(() => {
    if (disabled) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  }, [disabled, delay]);

  const hide = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hide();
    };
    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, hide]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (disabled) return children;

  const trigger = React.cloneElement(children as React.ReactElement<any>, {
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
    'aria-describedby': isVisible ? 'ds-tooltip-content' : undefined,
  });

  return (
    <div className="ds-Tooltip__wrapper" ref={containerRef} onMouseEnter={show} onMouseLeave={hide}>
      {trigger}
      {isVisible && (
        <div
          id="ds-tooltip-content"
          role="tooltip"
          className={`ds-Tooltip ds-Tooltip--placement-${placement}`}
          style={{ maxWidth }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
