'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { OmniSearchModal } from '../tools/OmniSearchModal';
import { ExportTokensModal } from '../tools/ExportTokensModal';
import { ThemeCustomizerDrawer } from '../tools/ThemeCustomizerDrawer';

interface HeaderProps {
  onToggleMobileSidebar?: () => void;
}

export default function Header({ onToggleMobileSidebar }: HeaderProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const themes = [
    { id: 'light', label: 'Light', icon: '☀️' },
    { id: 'dark', label: 'Dark', icon: '🌙' },
    { id: 'accessibility-high-contrast', label: 'Contrast', icon: '👁️' },
    { id: 'cosmic-neon', label: 'Cosmic', icon: '⚡' },
  ];

  return (
    <>
      <header
        style={{
          height: 'var(--site-header-height, 64px)',
          borderBottom: '1px solid var(--color-border-default, #e2e8f0)',
          background: 'var(--color-surface-card, var(--color-background-base, #ffffff))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 90,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {onToggleMobileSidebar && (
            <button
              type="button"
              onClick={onToggleMobileSidebar}
              aria-label="Toggle navigation drawer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                fontSize: '1.25rem',
                cursor: 'pointer',
                color: 'var(--color-text-primary)',
              }}
            >
              ☰
            </button>
          )}

          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: 'var(--color-text-primary)',
              fontWeight: 800,
              fontSize: '1.1rem',
            }}
          >
            <span
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: 800,
              }}
            >
              D
            </span>
            <span>Studio System</span>
          </Link>

          <nav style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
            <Link
              href="/foundations/colors"
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: pathname.startsWith('/foundations') ? 600 : 400,
                color: pathname.startsWith('/foundations') ? 'var(--color-interactive-primary)' : 'var(--color-text-secondary)',
                textDecoration: 'none',
                background: pathname.startsWith('/foundations') ? 'var(--color-interactive-primarySubtle)' : 'transparent',
              }}
            >
              Foundations
            </Link>
            <Link
              href="/components/button"
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: pathname.startsWith('/components') ? 600 : 400,
                color: pathname.startsWith('/components') ? 'var(--color-interactive-primary)' : 'var(--color-text-secondary)',
                textDecoration: 'none',
                background: pathname.startsWith('/components') ? 'var(--color-interactive-primarySubtle)' : 'transparent',
              }}
            >
              Components (35)
            </Link>
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Global Omnisearch Trigger */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            title="Search design system (⌘K)"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--color-border-default, #cbd5e1)',
              background: 'var(--color-background-subtle, #f8fafc)',
              color: 'var(--color-text-secondary, #64748b)',
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <span>🔍</span>
            <span>Search...</span>
            <kbd
              style={{
                background: 'var(--color-background-base, #ffffff)',
                border: '1px solid var(--color-border-default, #cbd5e1)',
                borderRadius: '4px',
                padding: '1px 5px',
                fontSize: '0.7rem',
                fontWeight: 700,
              }}
            >
              ⌘K
            </kbd>
          </button>

          {/* Export Tokens Button */}
          <button
            type="button"
            onClick={() => setIsExportOpen(true)}
            title="Export tokens for Figma Variables and Web"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--color-border-default, #cbd5e1)',
              background: 'var(--color-background-base, #ffffff)',
              color: 'var(--color-text-primary, #0f172a)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <span>⬇</span>
            <span>Export Tokens</span>
          </button>

          {/* Live Theme Sandbox */}
          <button
            type="button"
            onClick={() => setIsCustomizerOpen(true)}
            title="Open Live Theme Sandbox"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--color-border-default, #cbd5e1)',
              background: 'var(--color-background-base, #ffffff)',
              color: 'var(--color-text-primary, #0f172a)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <span>🎨</span>
            <span>Customize</span>
          </button>

          {/* Segmented Theme Picker */}
          <div
            role="group"
            aria-label="Theme selector"
            style={{
              display: 'flex',
              background: 'var(--color-background-subtle, #f1f5f9)',
              border: '1px solid var(--color-border-default, #cbd5e1)',
              borderRadius: '8px',
              padding: '3px',
              gap: '2px',
            }}
          >
            {themes.map((t) => {
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id as any)}
                  title={`Switch to ${t.label} theme`}
                  style={{
                    appearance: 'none',
                    border: 'none',
                    background: isSelected ? 'var(--color-background-base, #ffffff)' : 'transparent',
                    color: isSelected ? 'var(--color-interactive-primary, #2563eb)' : 'var(--color-text-secondary, #64748b)',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: isSelected ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Global Modals */}
      <OmniSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ExportTokensModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
      <ThemeCustomizerDrawer isOpen={isCustomizerOpen} onClose={() => setIsCustomizerOpen(false)} />
    </>
  );
}
