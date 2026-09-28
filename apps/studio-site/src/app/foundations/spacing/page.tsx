'use client';

import React from 'react';
import styles from './page.module.scss';

export default function SpacingPage() {
  const scale = [
    { step: '0', px: 0, rem: '0rem' },
    { step: 'px', px: 1, rem: '0.0625rem' },
    { step: '0.5', px: 2, rem: '0.125rem' },
    { step: '1', px: 4, rem: '0.25rem', alias: '2xs' },
    { step: '1.5', px: 6, rem: '0.375rem' },
    { step: '2', px: 8, rem: '0.5rem', alias: 'xs' },
    { step: '2.5', px: 10, rem: '0.625rem' },
    { step: '3', px: 12, rem: '0.75rem', alias: 'sm' },
    { step: '4', px: 16, rem: '1rem', alias: 'md' },
    { step: '5', px: 20, rem: '1.25rem' },
    { step: '6', px: 24, rem: '1.5rem', alias: 'lg' },
    { step: '7', px: 28, rem: '1.75rem' },
    { step: '8', px: 32, rem: '2rem', alias: 'xl' },
    { step: '10', px: 40, rem: '2.5rem', alias: '2xl' },
    { step: '12', px: 48, rem: '3rem', alias: '3xl' },
    { step: '16', px: 64, rem: '4rem', alias: '4xl' },
    { step: '20', px: 80, rem: '5rem', alias: '5xl' },
    { step: '24', px: 96, rem: '6rem', alias: '6xl' },
    { step: '32', px: 128, rem: '8rem' },
  ];

  const breakpoints = [
    { name: 'xs', width: '320px', desc: 'Small mobile portrait' },
    { name: 'sm', width: '640px', desc: 'Mobile landscape / mini tablets' },
    { name: 'md', width: '768px', desc: 'Tablets portrait' },
    { name: 'lg', width: '1024px', desc: 'Laptops / desktop monitors' },
    { name: 'xl', width: '1280px', desc: 'Standard widescreen desktops' },
    { name: '2xl', width: '1536px', desc: 'Large high-res displays' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', maxWidth: '1040px' }}>
      <header className={styles.hero}>
        <h1>Spacing & Spatial Grid</h1>
        <p>A 24-step mathematical scale anchored by a 4px base unit, governing internal padding, element separation, and layout breakpoints.</p>
      </header>

      {/* 24-Step Spacing Scale Visualizer */}
      <section>
        <h2>4px Mathematical Spacing Scale</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
          {scale.map((item) => (
            <div
              key={item.step}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                fontSize: '0.85rem',
              }}
            >
              <span style={{ width: '160px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)', flexShrink: 0 }}>
                --spacing-scale-{item.step}-rem {item.alias && `(${item.alias})`}
              </span>
              <span style={{ width: '80px', color: 'var(--color-text-tertiary)', fontSize: '0.75rem', flexShrink: 0 }}>
                {item.px}px ({item.rem})
              </span>
              <div
                style={{
                  height: '24px',
                  width: `${Math.max(item.px * 3, item.px > 0 ? 4 : 0)}px`,
                  maxWidth: '100%',
                  background: 'var(--color-interactive-primary)',
                  borderRadius: '4px',
                  opacity: 0.85,
                  minWidth: item.px > 0 ? '4px' : '0px',
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Spatial Patterns: Inset, Stack, Inline */}
      <section>
        <h2>Spatial Patterns (Inset, Stack, Inline)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '16px' }}>
          {/* Inset */}
          <div style={{ border: '1px solid var(--color-border-default)', borderRadius: '12px', padding: '24px', background: 'var(--color-surface-card)' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem' }}>Inset (Padding)</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: '0 0 16px' }}>
              Internal containment space inside cards, buttons, and popovers.
            </p>
            <div style={{ padding: '24px', background: 'var(--color-interactive-primarySubtle)', border: '1px dashed var(--color-interactive-primary)', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ padding: '12px', background: 'var(--color-background-base)', borderRadius: '4px', fontWeight: 600 }}>
                Content Block (Inset 24px)
              </div>
            </div>
          </div>

          {/* Stack */}
          <div style={{ border: '1px solid var(--color-border-default)', borderRadius: '12px', padding: '24px', background: 'var(--color-surface-card)' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem' }}>Stack (Vertical Gap)</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: '0 0 16px' }}>
              Vertical separation between form inputs, paragraphs, or list rows.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '10px', background: 'var(--color-background-muted)', borderRadius: '6px', fontSize: '0.85rem' }}>Row Item 1</div>
              <div style={{ padding: '10px', background: 'var(--color-background-muted)', borderRadius: '6px', fontSize: '0.85rem' }}>Row Item 2</div>
              <div style={{ padding: '10px', background: 'var(--color-background-muted)', borderRadius: '6px', fontSize: '0.85rem' }}>Row Item 3</div>
            </div>
          </div>

          {/* Inline */}
          <div style={{ border: '1px solid var(--color-border-default)', borderRadius: '12px', padding: '24px', background: 'var(--color-surface-card)' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem' }}>Inline (Horizontal Gap)</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: '0 0 16px' }}>
              Horizontal spacing between button groups, tags, and breadcrumbs.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ padding: '6px 12px', background: 'var(--color-background-muted)', borderRadius: '16px', fontSize: '0.8rem' }}>Tag A</span>
              <span style={{ padding: '6px 12px', background: 'var(--color-background-muted)', borderRadius: '16px', fontSize: '0.8rem' }}>Tag B</span>
              <span style={{ padding: '6px 12px', background: 'var(--color-background-muted)', borderRadius: '16px', fontSize: '0.8rem' }}>Tag C</span>
            </div>
          </div>
        </div>
      </section>

      {/* Breakpoints */}
      <section>
        <h2>Responsive Breakpoints</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
          {breakpoints.map((bp) => (
            <div key={bp.name} style={{ border: '1px solid var(--color-border-default)', borderRadius: '8px', padding: '16px', background: 'var(--color-surface-card)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-interactive-primary)' }}>{bp.name}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{bp.width}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: '8px 0 0' }}>{bp.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
