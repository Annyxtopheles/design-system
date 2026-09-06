import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import './DropdownMenu.scss';

export interface MenuItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  separator?: boolean;
  onClick?: () => void;
  children?: MenuItem[];
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  placement?: 'bottom-start' | 'bottom-end' | 'top-start';
  closeOnSelect?: boolean;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  placement = 'bottom-start',
  closeOnSelect = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const flatItems = items.filter(item => !item.separator);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setFocusedIndex(0);
      menuRef.current?.focus();
    } else {
      setFocusedIndex(-1);
    }
  }, [isOpen]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        setIsOpen(false);
        (containerRef.current?.querySelector('.ds-DropdownMenu__trigger') as HTMLElement)?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => {
          let next = (prev + 1) % flatItems.length;
          while (flatItems[next].disabled) {
            next = (next + 1) % flatItems.length;
          }
          return next;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => {
          let next = (prev - 1 + flatItems.length) % flatItems.length;
          while (flatItems[next].disabled) {
            next = (next - 1 + flatItems.length) % flatItems.length;
          }
          return next;
        });
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0 && !flatItems[focusedIndex].disabled) {
          flatItems[focusedIndex].onClick?.();
          if (closeOnSelect) setIsOpen(false);
        }
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  const renderItem = (item: MenuItem, index: number) => {
    if (item.separator) {
      return <div key={item.id} className="ds-DropdownMenu__separator" role="separator" />;
    }

    const isFocused = focusedIndex === flatItems.findIndex(i => i.id === item.id);

    return (
      <div
        key={item.id}
        role="menuitem"
        className={`ds-DropdownMenu__item ${item.disabled ? 'ds-DropdownMenu__item--disabled' : ''} ${isFocused ? 'ds-DropdownMenu__item--focused' : ''}`}
        aria-disabled={item.disabled}
        onClick={() => {
          if (!item.disabled) {
            item.onClick?.();
            if (closeOnSelect) setIsOpen(false);
          }
        }}
        onMouseEnter={() => {
          if (!item.disabled) {
            setFocusedIndex(flatItems.findIndex(i => i.id === item.id));
          }
        }}
      >
        {item.icon && <span className="ds-DropdownMenu__icon">{item.icon}</span>}
        <span className="ds-DropdownMenu__label">{item.label}</span>
        {item.shortcut && <span className="ds-DropdownMenu__shortcut">{item.shortcut}</span>}
        {item.children && <span className="ds-DropdownMenu__submenu-indicator">▶</span>}
      </div>
    );
  };

  return (
    <div className="ds-DropdownMenu" ref={containerRef} onKeyDown={handleKeyDown}>
      <div 
        className="ds-DropdownMenu__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        {trigger}
      </div>

      {isOpen && (
        <div 
          className={`ds-DropdownMenu__menu ds-DropdownMenu__menu--${placement}`}
          role="menu"
          ref={menuRef}
          tabIndex={-1}
        >
          {items.map((item, i) => renderItem(item, i))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
