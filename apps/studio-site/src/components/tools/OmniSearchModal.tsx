'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/navigation';
import styles from './OmniSearchModal.module.scss';

interface OmniSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  id: string;
  title: string;
  category: string;
  url: string;
  description: string;
  badge?: string;
}

export const OmniSearchModal: React.FC<OmniSearchModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Search items list
  const allItems: SearchItem[] = [
    // Foundations
    { id: 'f-colors', title: 'Color Palette & Semantic Tokens', category: 'Foundations', url: '/foundations/colors', description: 'Primary, secondary, neutral, and feedback color tokens across 4 themes.' },
    { id: 'f-typo', title: 'Typography & Scale', category: 'Foundations', url: '/foundations/typography', description: 'Font families, size scale, line heights, and letter spacing tokens.' },
    { id: 'f-spacing', title: 'Spatial Grid & Spacing', category: 'Foundations', url: '/foundations/spacing', description: '4px baseline spatial grid and density tokens.' },
    { id: 'f-elevation', title: 'Elevation & Shadow Layers', category: 'Foundations', url: '/foundations/elevation', description: '12 elevation levels across light, dark, and cosmic neon.' },
    { id: 'f-motion', title: 'Motion & Animation Curves', category: 'Foundations', url: '/foundations/motion', description: 'Durations, easings, and reduced-motion accessibility overrides.' },
    { id: 'f-border', title: 'Border Radius & Widths', category: 'Foundations', url: '/foundations/border', description: 'Radius tokens from sharp to full pill, border widths and styles.' },
    
    // Components
    ...NAV_ITEMS.filter((i) => i.group !== 'foundations').map((c) => ({
      id: c.slug,
      title: c.label,
      category: c.group.charAt(0).toUpperCase() + c.group.slice(1),
      url: `/${c.slug}`,
      description: c.description || `Accessible ${c.label} component with 5-tab documentation and live playground.`,
      badge: `WCAG ${c.wcagLevel}`,
    })),

    // Quick Tools
    { id: 't-figma', title: 'Figma Tokens (W3C DTCG)', category: 'Tools & Downloads', url: '/tokens/tokens.dtcg.json', description: 'Download DTCG JSON tokens for Figma Variables import.', badge: 'Download' },
    { id: 't-studio', title: 'Tokens Studio JSON', category: 'Tools & Downloads', url: '/tokens/tokens.tokens-studio.json', description: 'Download Tokens Studio plugin configuration for Figma.', badge: 'Download' },
    { id: 't-css', title: 'CSS Custom Properties', category: 'Tools & Downloads', url: '/tokens/tokens.css', description: 'Standalone tokens.css stylesheet with all themes.', badge: 'Download' },
  ];

  const filteredItems = query.trim()
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      )
    : allItems.slice(0, 10);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          navigate(filteredItems[selectedIndex].url);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex]);

  const navigate = (url: string) => {
    onClose();
    if (url.startsWith('/tokens/')) {
      window.open(url, '_blank');
    } else {
      router.push(url as any);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.searchHeader}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder="Search components, foundations, tokens, or tools... (Esc to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className={styles.kbdShortcut}>ESC</span>
        </div>

        <div className={styles.resultsList}>
          {filteredItems.length === 0 ? (
            <div className={styles.emptyState}>No results found for &ldquo;{query}&rdquo;</div>
          ) : (
            filteredItems.map((item, idx) => (
              <div
                key={item.id}
                className={`${styles.resultItem} ${idx === selectedIndex ? styles.selected : ''}`}
                onClick={() => navigate(item.url)}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div className={styles.itemMain}>
                  <div className={styles.itemTitleRow}>
                    <span className={styles.itemTitle}>{item.title}</span>
                    <span className={styles.itemCategory}>{item.category}</span>
                  </div>
                  <p className={styles.itemDescription}>{item.description}</p>
                </div>
                {item.badge && <span className={styles.itemBadge}>{item.badge}</span>}
              </div>
            ))
          )}
        </div>

        <div className={styles.footer}>
          <span><kbd className={styles.kbd}>↑</kbd> <kbd className={styles.kbd}>↓</kbd> to navigate</span>
          <span><kbd className={styles.kbd}>↵</kbd> to select</span>
          <span><kbd className={styles.kbd}>esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};
