import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border-default, #e2e8f0)',
        background: 'var(--color-surface-card, var(--color-background-base, #ffffff))',
        padding: '32px 24px',
        textAlign: 'center',
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary, #64748b)',
        marginTop: 'auto',
      }}
    >
      <p style={{ margin: '0 0 12px 0' }}>
        Built with Next.js 14 · Driven by 1,114 design tokens · 0 external UI framework dependencies
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '8px 0', fontWeight: 600 }}>
        <span>v1.0.0</span>
        <span>·</span>
        <span>35 Components</span>
        <span>·</span>
        <span>4 Calibrated Themes</span>
        <span>·</span>
        <span title="WCAG 2.2 Level AA/AAA compliant" style={{ color: 'var(--color-interactive-primary, #2563eb)' }}>
          WCAG 2.2 AA / AAA
        </span>
      </div>
      <p style={{ margin: '12px 0 0 0', fontSize: '0.8rem', color: 'var(--color-text-tertiary, #94a3b8)' }}>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          style={{ color: 'inherit', textDecoration: 'underline' }}
        >
          GitHub Repository
        </a>{' '}
        · MIT License · Industrial Design System
      </p>
    </footer>
  );
}
