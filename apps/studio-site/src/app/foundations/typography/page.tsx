'use client';

import React, { useState } from 'react';
import styles from './page.module.scss';

export default function TypographyPage() {
  const [sampleText, setSampleText] = useState('Sphinx of black quartz, judge my vow');

  const scaleSteps = [
    { name: '2xs', px: 8, rem: '0.5rem', lh: '1.5', ls: '0.025em', weight: 400 },
    { name: 'xs', px: 10, rem: '0.625rem', lh: '1.5', ls: '0em', weight: 400 },
    { name: 'sm', px: 12, rem: '0.75rem', lh: '1.5', ls: '0em', weight: 400 },
    { name: 'base', px: 14, rem: '0.875rem', lh: '1.5', ls: '0em', weight: 400 },
    { name: 'md', px: 16, rem: '1rem', lh: '1.5', ls: '0em', weight: 400 },
    { name: 'md-plus', px: 18, rem: '1.125rem', lh: '1.375', ls: '0em', weight: 400 },
    { name: 'lg', px: 20, rem: '1.25rem', lh: '1.375', ls: '-0.025em', weight: 500 },
    { name: 'xl', px: 24, rem: '1.5rem', lh: '1.2', ls: '-0.025em', weight: 600 },
    { name: '2xl', px: 32, rem: '2rem', lh: '1.2', ls: '-0.05em', weight: 700 },
    { name: '3xl', px: 40, rem: '2.5rem', lh: '1.2', ls: '-0.05em', weight: 700 },
    { name: '4xl', px: 48, rem: '3rem', lh: '1.0', ls: '-0.05em', weight: 800 },
    { name: '5xl', px: 64, rem: '4rem', lh: '1.0', ls: '-0.05em', weight: 900 },
  ];

  const fontFamilies = [
    { name: 'Sans Serif (System / Inter)', token: '--typography-fontFamily-sans', val: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" },
    { name: 'Display (Inter Display / DM Sans)', token: '--typography-fontFamily-display', val: "'Inter Display', 'DM Sans', system-ui, sans-serif" },
    { name: 'Monospace (JetBrains Mono / Fira)', token: '--typography-fontFamily-mono', val: "'JetBrains Mono', 'Fira Code', Consolas, monospace" },
    { name: 'Serif (Playfair / Georgia)', token: '--typography-fontFamily-serif', val: "Georgia, 'Times New Roman', serif" },
  ];

  const weights = [
    { name: 'Regular', value: 400 },
    { name: 'Medium', value: 500 },
    { name: 'SemiBold', value: 600 },
    { name: 'Bold', value: 700 },
    { name: 'Black', value: 900 },
  ];

  const textStylesList = [
    { name: 'display1', size: '3.5rem', weight: 800, sample: 'Display One Hero Heading' },
    { name: 'h1', size: '2.5rem', weight: 700, sample: 'Page Title Header (H1)' },
    { name: 'h2', size: '2rem', weight: 700, sample: 'Section Section Heading (H2)' },
    { name: 'h3', size: '1.5rem', weight: 600, sample: 'Subsection Heading (H3)' },
    { name: 'bodyLg', size: '1.125rem', weight: 400, sample: 'Large lead paragraph body text.' },
    { name: 'bodyMd', size: '1rem', weight: 400, sample: 'Default standard interface paragraph typography.' },
    { name: 'bodySm', size: '0.875rem', weight: 400, sample: 'Secondary supporting text or captions.' },
    { name: 'code', size: '0.875rem', weight: 400, sample: 'const token = getToken("color.brand");', mono: true },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', maxWidth: '1040px' }}>
      <header className={styles.hero}>
        <h1>Typography System</h1>
        <p>A 24-step Minor Third (1.250×) mathematical typographic scale anchored at 16px, designed for readability across mobile and desktop screens.</p>

        <div style={{ marginTop: '20px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
            Preview Custom Specimen Text:
          </label>
          <input
            type="text"
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '540px',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid var(--color-border-default)',
              background: 'var(--color-background-base)',
              color: 'var(--color-text-primary)',
              fontSize: '0.9rem',
            }}
          />
        </div>
      </header>

      {/* 24-Step Type Scale */}
      <section>
        <h2>Minor Third Typographic Scale</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
          {scaleSteps.map((step) => (
            <div
              key={step.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--color-border-subtle)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>
                <span><strong>--typography-scale-{step.name}-rem</strong> ({step.rem} / {step.px}px)</span>
                <span>Line-Height: {step.lh} | Letter-Spacing: {step.ls}</span>
              </div>
              <div
                style={{
                  fontSize: `var(--typography-scale-${step.name}-rem, ${step.rem})`,
                  lineHeight: step.lh,
                  letterSpacing: step.ls,
                  fontWeight: step.weight,
                  color: 'var(--color-text-primary)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {sampleText}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Font Families */}
      <section>
        <h2>Font Families</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '20px', marginTop: '16px' }}>
          {fontFamilies.map((fam) => (
            <div key={fam.name} style={{ border: '1px solid var(--color-border-default)', borderRadius: '12px', padding: '20px', background: 'var(--color-surface-card)' }}>
              <h3 style={{ margin: '0 0 6px', fontSize: '1.1rem' }}>{fam.name}</h3>
              <code style={{ fontSize: '0.75rem', color: 'var(--color-text-brand)' }}>{fam.token}</code>
              <p style={{ fontFamily: `var(${fam.token})`, fontSize: '1.25rem', margin: '16px 0 8px', color: 'var(--color-text-primary)' }}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                abcdefghijklmnopqrstuvwxyz 0123456789
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Font Weights */}
      <section>
        <h2>Font Weights</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginTop: '16px' }}>
          {weights.map((w) => (
            <div key={w.value} style={{ border: '1px solid var(--color-border-default)', borderRadius: '8px', padding: '16px', background: 'var(--color-surface-card)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>Weight {w.value}</div>
              <div style={{ fontWeight: w.value, fontSize: '1.2rem', marginTop: '4px', color: 'var(--color-text-primary)' }}>
                {w.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Composite Text Styles */}
      <section>
        <h2>Composite Text Styles</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
          {textStylesList.map((ts) => (
            <div key={ts.name} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '12px 16px', border: '1px solid var(--color-border-default)', borderRadius: '8px', background: 'var(--color-surface-card)' }}>
              <span style={{ fontSize: ts.size, fontWeight: ts.weight, fontFamily: ts.mono ? 'var(--font-mono)' : 'inherit', color: 'var(--color-text-primary)' }}>
                {ts.sample}
              </span>
              <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', flexShrink: 0 }}>
                {ts.name} ({ts.size})
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
