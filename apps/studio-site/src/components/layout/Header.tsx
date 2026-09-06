'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';

export default function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <header style={{ height: 'var(--site-header-height, 64px)', borderBottom: '1px solid var(--color-border-base, #eee)', display: 'flex', alignItems: 'center', padding: '0 24px', justifyContent: 'space-between' }}>
      <div>
        <strong>Design System</strong>
      </div>
      <div style={{ color: '#666', fontSize: '0.9rem' }}>
        {pathname}
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <select value={theme} onChange={(e) => setTheme(e.target.value as any)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="accessibility-high-contrast">High Contrast</option>
          <option value="cosmic-neon">Cosmic Neon</option>
        </select>
        <a href="https://github.com" style={{ textDecoration: 'none', color: 'inherit' }}>GitHub</a>
      </div>
    </header>
  );
}
