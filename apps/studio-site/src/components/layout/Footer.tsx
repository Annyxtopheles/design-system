import React from 'react';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--color-border-base, #eee)', padding: '24px', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
      <p>Built with Next.js 14 · Powered by custom design tokens · 0 external UI dependencies</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', margin: '8px 0' }}>
        <span>v1.0.0</span>
        <span>1,114 Tokens</span>
        <span title="WCAG 2.2 Level AA compliance badge">WCAG AA</span>
      </div>
      <p><a href="https://github.com" style={{ color: 'inherit' }}>GitHub</a> · MIT License</p>
    </footer>
  );
}
