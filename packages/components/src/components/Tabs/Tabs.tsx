import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import './Tabs.scss';

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  activeTab?: string;
  onChange?: (id: string) => void;
  variant?: 'line' | 'enclosed' | 'pills';
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  'aria-label'?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  activeTab: controlledActiveTab,
  onChange,
  variant = 'line',
  orientation = 'horizontal',
  size = 'md',
  'aria-label': ariaLabel = 'Tabs',
}) => {
  const isControlled = controlledActiveTab !== undefined;
  const initialTab = defaultTab || (tabs.length > 0 ? tabs[0].id : '');
  const [uncontrolledActiveTab, setUncontrolledActiveTab] = useState(initialTab);
  
  const currentTab = isControlled ? controlledActiveTab : uncontrolledActiveTab;
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (id: string) => {
    if (!isControlled) {
      setUncontrolledActiveTab(id);
    }
    onChange?.(id);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
    const prevKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';

    let newIndex = index;

    if (e.key === nextKey) {
      newIndex = (index + 1) % tabs.length;
      while (tabs[newIndex].disabled && newIndex !== index) {
        newIndex = (newIndex + 1) % tabs.length;
      }
    } else if (e.key === prevKey) {
      newIndex = (index - 1 + tabs.length) % tabs.length;
      while (tabs[newIndex].disabled && newIndex !== index) {
        newIndex = (newIndex - 1 + tabs.length) % tabs.length;
      }
    } else if (e.key === 'Home') {
      newIndex = 0;
      while (tabs[newIndex].disabled && newIndex < tabs.length - 1) {
        newIndex++;
      }
    } else if (e.key === 'End') {
      newIndex = tabs.length - 1;
      while (tabs[newIndex].disabled && newIndex > 0) {
        newIndex--;
      }
    }

    if (newIndex !== index) {
      e.preventDefault();
      const tabElements = tabListRef.current?.querySelectorAll('[role="tab"]');
      if (tabElements && tabElements[newIndex]) {
        (tabElements[newIndex] as HTMLElement).focus();
        if (variant !== 'line') {
           // Optionally auto-activate on focus, standard behavior for some tabs, but click to activate is safer
        }
      }
    }
  };

  const activeContent = tabs.find(tab => tab.id === currentTab)?.content;

  return (
    <div 
      className={`ds-Tabs ds-Tabs--${variant} ds-Tabs--${orientation} ds-Tabs--${size}`}
      data-testid="ds-tabs"
    >
      <div 
        className="ds-Tabs__list" 
        role="tablist" 
        aria-label={ariaLabel}
        aria-orientation={orientation}
        ref={tabListRef}
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === currentTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              className={`ds-Tabs__tab ${isActive ? 'ds-Tabs__tab--active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {tab.icon && <span className="ds-Tabs__icon">{tab.icon}</span>}
              {tab.label}
            </button>
          );
        })}
      </div>
      <div 
        className="ds-Tabs__panel"
        id={`panel-${currentTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${currentTab}`}
        tabIndex={0}
      >
        {activeContent}
      </div>
    </div>
  );
};

export default Tabs;
