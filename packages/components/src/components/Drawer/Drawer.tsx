import React, { useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './Drawer.scss';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'full';
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  initialFocus?: React.RefObject<HTMLElement>;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  placement = 'right',
  size = 'md',
  title,
  children,
  footer,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  initialFocus
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      
      if (initialFocus?.current) {
        initialFocus.current.focus();
      } else {
        drawerRef.current?.focus();
      }
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open, initialFocus]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && closeOnEsc) {
      onClose();
    }
    
    if (e.key === 'Tab') {
      const focusableElements = drawerRef.current?.querySelectorAll(
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

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  if (!open) return null;

  const content = (
    <div className="ds-Drawer" onKeyDown={handleKeyDown}>
      <div 
        className="ds-Drawer__overlay" 
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      
      <div 
        className={`ds-Drawer__content ds-Drawer__content--${placement} ds-Drawer__content--${size}`}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : 'Drawer'}
        ref={drawerRef}
        tabIndex={-1}
      >
        <div className="ds-Drawer__header">
          {title && <div className="ds-Drawer__title">{title}</div>}
          <button 
            className="ds-Drawer__close"
            onClick={onClose}
            aria-label="Close drawer"
          >
            ×
          </button>
        </div>
        
        <div className="ds-Drawer__body">
          {children}
        </div>
        
        {footer && (
          <div className="ds-Drawer__footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : content;
};

export default Drawer;
