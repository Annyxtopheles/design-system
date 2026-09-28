'use client';

import React from 'react';
import styles from './page.module.scss';
import { useTheme } from '../../../components/layout/ThemeProvider';

export default function ElevationPage() {
  const { theme, setTheme } = useTheme();

  const levels = [
    { level: 0, name: 'flat', desc: 'Flush to background surface — static table cells, dividers' },
    { level: 1, name: 'minimal', desc: 'Subtle lift — tags, chips, input resting state' },
    { level: 2, name: 'low', desc: 'Cards, tiles, list items in resting state' },
    { level: 3, name: 'raised', desc: 'Hover state for cards, floating active list items' },
    { level: 4, name: 'floating', desc: 'Floating action buttons, select dropdowns' },
    { level: 5, name: 'elevated', desc: 'Sticky headers, elevated navigation bars' },
    { level: 6, name: 'sticky', desc: 'Focus rings on elevated cards, sticky navigation' },
    { level: 7, name: 'popup', desc: 'Tooltips, popups, autocomplete menus' },
    { level: 8, name: 'dropdown', desc: 'Dropdown menus, context menus, select popovers' },
    { level: 9, name: 'drawer', desc: 'Slide-out side drawers, navigation sheets' },
    { level: 10, name: 'modal', desc: 'Modal dialogs, alert confirmations' },
    { level: 11, name: 'peak', desc: 'Notification toasts, high-priority system alerts' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', maxWidth: '1040px' }}>
      <header className={styles.hero}>
        <h1>Elevation & Depth System</h1>
        <p>A 12-level multi-layered shadow model composing ambient diffusion, directional key light, and rim-light highlights tailored per theme.</p>

        {/* Live Theme Switcher */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          {[
            { id: 'light', label: '☀️ Light' },
            { id: 'dark', label: '🌙 Dark' },
            { id: 'cosmic-neon', label: '⚡ Cosmic Neon' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTheme(t.id as any)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: '1px solid var(--color-border-default)',
                background: theme === t.id ? 'var(--color-interactive-primary)' : 'var(--color-background-base)',
                color: theme === t.id ? '#ffffff' : 'var(--color-text-primary)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      {/* 12-Level Shadow Gallery */}
      <section>
        <h2>12-Level Multi-Shadow Gallery</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '20px' }}>
          {levels.map((item) => (
            <div
              key={item.level}
              style={{
                padding: '24px',
                borderRadius: '12px',
                background: 'var(--color-surface-card)',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--color-border-subtle)',
                boxShadow: `var(--elevation-${item.level})`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '130px',
                transition: 'box-shadow var(--motion-duration-moderate) ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: '1.05rem', textTransform: 'capitalize' }}>
                    Level {item.level}: {item.name}
                  </strong>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: '8px 0 0' }}>
                  {item.desc}
                </p>
              </div>
              <code style={{ fontSize: '0.75rem', color: 'var(--color-text-brand)', marginTop: '12px' }}>
                box-shadow: var(--elevation-{item.level});
              </code>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Elevation Transition Playground */}
      <section>
        <h2>Interactive Hover Elevation Transition</h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: '4px 0 16px' }}>
          Hover over the card below to see fluid transition from resting state (`--elevation-2`) to raised state (`--elevation-6`):
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 0' }}>
          <div
            style={{
              padding: '32px',
              maxWidth: '400px',
              width: '100%',
              borderRadius: '16px',
              background: 'var(--color-surface-card)',
              border: '1px solid var(--color-border-default)',
              boxShadow: 'var(--elevation-2)',
              cursor: 'pointer',
              transition: 'all var(--motion-duration-moderate) var(--motion-easing-standard)',
              textAlign: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = 'var(--elevation-7)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'var(--elevation-2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <h3 style={{ margin: '0 0 8px' }}>Hover Me</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              Smooth physics curve transitions ambient diffusion and directional offset together.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
