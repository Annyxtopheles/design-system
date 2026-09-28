'use client';

import React from 'react';
import styles from './page.module.scss';

export default function BorderPage() {
  const radii = [
    { name: 'none', val: '0px' },
    { name: '2xs', val: '2px' },
    { name: 'xs', val: '4px' },
    { name: 'sm', val: '6px' },
    { name: 'md', val: '8px' },
    { name: 'lg', val: '12px' },
    { name: 'xl', val: '16px' },
    { name: '2xl', val: '24px' },
    { name: '3xl', val: '32px' },
    { name: 'full', val: '9999px' },
  ];

  const widths = [
    { name: 'hairline', val: '0.5px' },
    { name: 'thin', val: '1px' },
    { name: 'base', val: '2px' },
    { name: 'medium', val: '3px' },
    { name: 'thick', val: '4px' },
    { name: 'heavy', val: '8px' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', maxWidth: '1040px' }}>
      <header className={styles.hero}>
        <h1>Borders & Outlines</h1>
        <p>A precision border system governing corner curvature, hairline divider thicknesses, and WCAG-compliant high-contrast focus rings.</p>
      </header>

      {/* Radii scale */}
      <section>
        <h2>Border Radii Scale (10 Steps)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '16px', marginTop: '16px' }}>
          {radii.map((r) => (
            <div
              key={r.name}
              style={{
                border: '1px solid var(--color-border-default)',
                borderRadius: '12px',
                padding: '16px',
                background: 'var(--color-surface-card)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  background: 'var(--color-interactive-primarySubtle)',
                  border: '2px solid var(--color-interactive-primary)',
                  borderRadius: `var(--border-radius-${r.name}, ${r.val})`,
                }}
              />
              <div style={{ textAlign: 'center' }}>
                <strong style={{ fontSize: '0.9rem' }}>{r.name}</strong>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)' }}>
                  {r.val}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Border Widths */}
      <section>
        <h2>Border Widths (6 Steps)</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
          {widths.map((w) => (
            <div key={w.name} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '140px', fontWeight: 600, fontSize: '0.85rem' }}>
                --border-width-{w.name} ({w.val})
              </div>
              <div
                style={{
                  flex: 1,
                  height: '0px',
                  borderTop: `var(--border-width-${w.name}, ${w.val}) solid var(--color-border-strong)`,
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Focus Ring Specifications */}
      <section style={{ border: '1px solid var(--color-border-default)', borderRadius: '12px', padding: '24px', background: 'var(--color-surface-card)' }}>
        <h2>Accessible Focus Ring (WCAG 2.4.7)</h2>
        <p style={{ lineHeight: 1.6, color: 'var(--color-text-secondary)', margin: '4px 0 20px' }}>
          All interactive elements inherit a standardized 2px outline with a 2px offset, ensuring clear visibility over both dark and light backgrounds without shifting element layout geometry.
        </p>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button
            type="button"
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--color-interactive-primary)',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
              outline: '2px solid var(--color-border-focus, #3b82f6)',
              outlineOffset: '2px',
            }}
          >
            Tab Focus Demonstration
          </button>
          <code style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
            outline: 2px solid var(--color-border-focus); outline-offset: 2px;
          </code>
        </div>
      </section>
    </div>
  );
}
