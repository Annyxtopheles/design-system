import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './CommandPalette.scss';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  group?: string;
  shortcut?: string;
  onSelect: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
  onSearch?: (query: string) => Promise<void> | void;
  emptyMessage?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  open,
  onClose,
  items,
  placeholder = 'Search commands...',
  onSearch,
  emptyMessage = 'No results found.'
}) => {
  const [query, setQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setFocusedIndex(0);
      document.body.style.overflow = 'hidden';
      // Slight delay to ensure element is rendered
      setTimeout(() => inputRef.current?.focus(), 10);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (onSearch) {
      onSearch(query);
    }
  }, [query, onSearch]);

  const filteredItems = items.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase()) || 
    (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
  );

  const groupedItems = filteredItems.reduce((acc, item) => {
    const group = item.group || 'General';
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  const flattenedResults = Object.values(groupedItems).flat();

  useEffect(() => {
    setFocusedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => (prev + 1) % flattenedResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => (prev - 1 + flattenedResults.length) % flattenedResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (flattenedResults[focusedIndex]) {
        flattenedResults[focusedIndex].onSelect();
        onClose();
      }
    }
  };

  if (!open) return null;

  const content = (
    <div className="ds-CommandPalette">
      <div className="ds-CommandPalette__overlay" onClick={onClose} aria-hidden="true" />
      <div 
        className="ds-CommandPalette__dialog" 
        role="dialog" 
        aria-modal="true"
        onKeyDown={handleKeyDown}
      >
        <div className="ds-CommandPalette__header">
          <input
            ref={inputRef}
            className="ds-CommandPalette__input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            role="combobox"
            aria-expanded={true}
            aria-controls="command-palette-listbox"
            aria-activedescendant={flattenedResults[focusedIndex]?.id}
          />
        </div>
        
        <div 
          className="ds-CommandPalette__listbox" 
          id="command-palette-listbox"
          role="listbox"
          ref={listboxRef}
        >
          {flattenedResults.length === 0 ? (
            <div className="ds-CommandPalette__empty">{emptyMessage}</div>
          ) : (
            Object.entries(groupedItems).map(([group, groupItems]) => (
              <div key={group} className="ds-CommandPalette__group" role="group" aria-label={group}>
                <div className="ds-CommandPalette__group-heading">{group}</div>
                {groupItems.map(item => {
                  const globalIndex = flattenedResults.findIndex(i => i.id === item.id);
                  const isFocused = globalIndex === focusedIndex;
                  
                  return (
                    <div
                      key={item.id}
                      id={item.id}
                      className={`ds-CommandPalette__item ${isFocused ? 'ds-CommandPalette__item--focused' : ''}`}
                      role="option"
                      aria-selected={isFocused}
                      onClick={() => {
                        item.onSelect();
                        onClose();
                      }}
                      onMouseEnter={() => setFocusedIndex(globalIndex)}
                    >
                      {item.icon && <span className="ds-CommandPalette__item-icon">{item.icon}</span>}
                      <div className="ds-CommandPalette__item-content">
                        <div className="ds-CommandPalette__item-label">
                          {/* Simple highlight of query match could go here */}
                          {item.label}
                        </div>
                        {item.description && (
                          <div className="ds-CommandPalette__item-description">{item.description}</div>
                        )}
                      </div>
                      {item.shortcut && (
                        <div className="ds-CommandPalette__item-shortcut">{item.shortcut}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : content;
};

export default CommandPalette;
