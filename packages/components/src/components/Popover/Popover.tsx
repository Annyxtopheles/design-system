import React, { useState, useRef, useEffect, KeyboardEvent, ReactNode } from 'react';
import './Popover.scss';

export interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'bottom-start';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  title?: ReactNode;
  showArrow?: boolean;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  placement = 'bottom',
  open: controlledOpen,
  onOpenChange,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  title,
  showArrow = true
}) => {
  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  useEffect(() => {
    if (!isOpen || !closeOnOutsideClick) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleOpenChange(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeOnOutsideClick]);

  useEffect(() => {
    if (isOpen) {
      const focusableElements = popoverRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isOpen]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isOpen && closeOnEsc && e.key === 'Escape') {
      handleOpenChange(false);
      (containerRef.current?.querySelector('.ds-Popover__trigger') as HTMLElement)?.focus();
    }
    
    if (isOpen && e.key === 'Tab') {
      const focusableElements = popoverRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;
      
      if (focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      } else {
        e.preventDefault();
      }
    }
  };

  return (
    <div className="ds-Popover" ref={containerRef} onKeyDown={handleKeyDown}>
      <div 
        className="ds-Popover__trigger" 
        onClick={() => handleOpenChange(!isOpen)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        {trigger}
      </div>

      {isOpen && (
        <div 
          className={`ds-Popover__content ds-Popover__content--${placement}`}
          role="dialog"
          aria-label={typeof title === 'string' ? title : 'Popover'}
          ref={popoverRef}
          tabIndex={-1}
        >
          {showArrow && <div className={`ds-Popover__arrow ds-Popover__arrow--${placement}`} />}
          {title && <div className="ds-Popover__header">{title}</div>}
          <div className="ds-Popover__body">{content}</div>
        </div>
      )}
    </div>
  );
};

export default Popover;
