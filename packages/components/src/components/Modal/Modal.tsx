import React, { useEffect, useRef } from 'react';
import './Modal.scss';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  hideCloseButton?: boolean;
  initialFocus?: React.RefObject<HTMLElement>;
}

const FOCUSABLE_SELECTORS = [
  'a[href]', 'button:not([disabled])', 'input:not([disabled])',
  'select:not([disabled])', 'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])', 'details > summary'
].join(', ');

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  size = 'md',
  hideCloseButton = false,
  initialFocus
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const focusableEls = Array.from(
          modalRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS) ?? []
        ).filter(el => !el.closest('[aria-hidden="true"]'));
        
        if (focusableEls.length === 0) {
          e.preventDefault();
          return;
        }

        const first = focusableEls[0];
        const last = focusableEls[focusableEls.length - 1];
        
        if (e.shiftKey) {
          if (document.activeElement === first) { 
            e.preventDefault(); 
            last?.focus(); 
          }
        } else {
          if (document.activeElement === last) { 
            e.preventDefault(); 
            first?.focus(); 
          }
        }
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      
      setTimeout(() => {
        if (initialFocus?.current) { 
          initialFocus.current.focus(); 
        } else {
          const firstFocusable = modalRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTORS);
          firstFocusable?.focus() ?? modalRef.current?.focus();
        }
      }, 0);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose, initialFocus]);

  if (!open) return null;

  return (
    <div className="ds-Modal" role="dialog" aria-modal="true" aria-labelledby={title ? 'modal-title' : undefined}>
      <div className="ds-Modal__backdrop" aria-hidden="true" onClick={onClose} />
      <div 
        className={`ds-Modal__content ds-Modal__content--${size}`} 
        ref={modalRef} 
        tabIndex={-1}
      >
        {(title || !hideCloseButton) && (
          <div className="ds-Modal__header">
            {title && <h2 id="modal-title" className="ds-Modal__title">{title}</h2>}
            {!hideCloseButton && (
              <button 
                type="button" 
                className="ds-Modal__close-btn" 
                onClick={onClose}
                aria-label="Close modal"
              >
                &times;
              </button>
            )}
          </div>
        )}
        <div className="ds-Modal__body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
