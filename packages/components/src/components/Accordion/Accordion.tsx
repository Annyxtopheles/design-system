import React, { useState, useRef, useEffect, Children } from 'react';
import './Accordion.scss';

export interface AccordionItemProps {
  /** The title of the accordion item */
  title: React.ReactNode;
  /** Content of the accordion item */
  children: React.ReactNode;
  /** Internal ID injected by parent */
  id?: string;
  /** Whether this item is open initially (if not controlled by parent) */
  defaultOpen?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Optional icon to display before title */
  icon?: React.ReactNode;
  /** Internal open state */
  isOpen?: boolean;
  /** Internal toggle handler */
  onToggle?: () => void;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  id = Math.random().toString(36).substr(2, 9),
  disabled = false,
  icon,
  isOpen = false,
  onToggle,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>(0);

  useEffect(() => {
    if (isOpen) {
      const contentEl = contentRef.current;
      if (contentEl) {
        setHeight(contentEl.scrollHeight);
      }
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className={`ds-AccordionItem ${isOpen ? 'is-open' : ''} ${disabled ? 'is-disabled' : ''}`}>
      <button
        type="button"
        className="ds-AccordionItem__header"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
        id={`accordion-header-${id}`}
        disabled={disabled}
        onClick={onToggle}
      >
        {icon && <span className="ds-AccordionItem__icon">{icon}</span>}
        <span className="ds-AccordionItem__title">{title}</span>
        <span className="ds-AccordionItem__chevron">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      <div
        id={`accordion-content-${id}`}
        role="region"
        aria-labelledby={`accordion-header-${id}`}
        className="ds-AccordionItem__content-wrapper"
        style={{ height }}
        ref={contentRef}
      >
        <div className="ds-AccordionItem__content">{children}</div>
      </div>
    </div>
  );
};

export interface AccordionProps {
  /** Array of AccordionItems or children elements */
  children: React.ReactNode;
  /** Allow multiple items to be open at once */
  allowMultiple?: boolean;
  /** Visual variant */
  variant?: 'default' | 'bordered' | 'ghost';
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  allowMultiple = false,
  variant = 'default',
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const handleToggle = (index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const headers = Array.from(e.currentTarget.querySelectorAll('.ds-AccordionItem__header:not([disabled])')) as HTMLElement[];
    const activeElement = document.activeElement as HTMLElement;
    const currentIndex = headers.indexOf(activeElement);

    if (currentIndex === -1) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % headers.length;
      headers[nextIndex].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + headers.length) % headers.length;
      headers[prevIndex].focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      headers[0].focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      headers[headers.length - 1].focus();
    }
  };

  return (
    <div className={`ds-Accordion ds-Accordion--variant-${variant}`} onKeyDown={handleKeyDown}>
      {Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<AccordionItemProps>, {
            isOpen: child.props.defaultOpen || openItems.has(index),
            onToggle: () => handleToggle(index),
            id: child.props.id || `acc-item-${index}`,
          });
        }
        return child;
      })}
    </div>
  );
};

export default Accordion;
