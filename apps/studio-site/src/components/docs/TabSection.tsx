'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './TabSection.module.scss';

export interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
}

export interface TabSectionProps {
  tabs: (string | TabItem)[];
  children?: React.ReactNode;
}

export const TabSection: React.FC<TabSectionProps> = ({ tabs, children }) => {
  const childrenArray = React.Children.toArray(children);

  const normalizedTabs: TabItem[] = tabs.map((tab, idx) => {
    if (typeof tab === 'string') {
      const id = tab.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `tab-${idx}`;
      return {
        id,
        label: tab,
        content: childrenArray[idx]
      };
    }
    return {
      ...tab,
      content: tab.content ?? childrenArray[idx]
    };
  });

  const [activeTab, setActiveTab] = useState(normalizedTabs[0]?.id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam && normalizedTabs.some(t => t.id === tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, [normalizedTabs]);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', id);
      window.history.pushState({}, '', url);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % normalizedTabs.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + normalizedTabs.length) % normalizedTabs.length;
    }

    if (newIndex !== index) {
      e.preventDefault();
      tabRefs.current[newIndex]?.focus();
      handleTabChange(normalizedTabs[newIndex].id);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.tablist} role="tablist" aria-label="Component Documentation Sections">
        {normalizedTabs.map((tab, idx) => (
          <button
            key={tab.id}
            ref={el => {
              if (el) tabRefs.current[idx] = el;
            }}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => handleTabChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.panels}>
        {normalizedTabs.map(tab => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTab !== tab.id}
            className={styles.panel}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};
export default TabSection;
