'use client';

import React, { useState, useEffect } from 'react';
import styles from './ThemeCustomizerDrawer.module.scss';

interface ThemeCustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const COLOR_PRESETS = [
  { name: 'Default Blue', hex: '#2563eb', subtle: '#eff6ff' },
  { name: 'Indigo', hex: '#4f46e5', subtle: '#eef2ff' },
  { name: 'Emerald', hex: '#059669', subtle: '#ecfdf5' },
  { name: 'Violet', hex: '#7c3aed', subtle: '#f5f3ff' },
  { name: 'Rose', hex: '#e11d48', subtle: '#fff1f2' },
  { name: 'Amber', hex: '#d97706', subtle: '#fffbeb' },
  { name: 'Cyan', hex: '#0891b2', subtle: '#ecfeff' },
];

const RADIUS_PRESETS = [
  { name: 'Sharp (0px)', sm: '0px', md: '0px', lg: '0px', xl: '0px' },
  { name: 'Subtle (4px)', sm: '2px', md: '4px', lg: '6px', xl: '8px' },
  { name: 'Default (8px)', sm: '4px', md: '8px', lg: '12px', xl: '16px' },
  { name: 'Soft (16px)', sm: '6px', md: '12px', lg: '18px', xl: '24px' },
  { name: 'Pill (Full)', sm: '9999px', md: '9999px', lg: '9999px', xl: '9999px' },
];

const FONT_PRESETS = [
  { name: 'Inter (Default Sans)', stack: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" },
  { name: 'System UI', stack: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" },
  { name: 'Monospace Code', stack: "'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, monospace" },
  { name: 'Editorial Serif', stack: "Georgia, 'Times New Roman', 'Playfair Display', serif" },
];

export const ThemeCustomizerDrawer: React.FC<ThemeCustomizerDrawerProps> = ({ isOpen, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(COLOR_PRESETS[0]);
  const [selectedRadius, setSelectedRadius] = useState(RADIUS_PRESETS[2]);
  const [selectedFont, setSelectedFont] = useState(FONT_PRESETS[0]);
  const [copied, setCopied] = useState(false);

  // Apply customizations to document root
  const applyOverrides = (color: typeof COLOR_PRESETS[0], radius: typeof RADIUS_PRESETS[0], font: typeof FONT_PRESETS[0]) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    root.style.setProperty('--color-interactive-primary', color.hex);
    root.style.setProperty('--color-interactive-primarySubtle', color.subtle);
    root.style.setProperty('--color-border-focus', color.hex);
    root.style.setProperty('--color-background-brand', color.hex);

    root.style.setProperty('--border-radius-sm', radius.sm);
    root.style.setProperty('--border-radius-md', radius.md);
    root.style.setProperty('--border-radius-lg', radius.lg);
    root.style.setProperty('--border-radius-xl', radius.xl);

    root.style.setProperty('--font-sans', font.stack);
  };

  const handleColorChange = (c: typeof COLOR_PRESETS[0]) => {
    setSelectedColor(c);
    applyOverrides(c, selectedRadius, selectedFont);
  };

  const handleRadiusChange = (r: typeof RADIUS_PRESETS[0]) => {
    setSelectedRadius(r);
    applyOverrides(selectedColor, r, selectedFont);
  };

  const handleFontChange = (f: typeof FONT_PRESETS[0]) => {
    setSelectedFont(f);
    applyOverrides(selectedColor, selectedRadius, f);
  };

  const handleReset = () => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    root.style.removeProperty('--color-interactive-primary');
    root.style.removeProperty('--color-interactive-primarySubtle');
    root.style.removeProperty('--color-border-focus');
    root.style.removeProperty('--color-background-brand');
    root.style.removeProperty('--border-radius-sm');
    root.style.removeProperty('--border-radius-md');
    root.style.removeProperty('--border-radius-lg');
    root.style.removeProperty('--border-radius-xl');
    root.style.removeProperty('--font-sans');

    setSelectedColor(COLOR_PRESETS[0]);
    setSelectedRadius(RADIUS_PRESETS[2]);
    setSelectedFont(FONT_PRESETS[0]);
  };

  const generatedCss = `:root {
  --color-interactive-primary: ${selectedColor.hex};
  --color-interactive-primarySubtle: ${selectedColor.subtle};
  --color-border-focus: ${selectedColor.hex};
  --border-radius-sm: ${selectedRadius.sm};
  --border-radius-md: ${selectedRadius.md};
  --border-radius-lg: ${selectedRadius.lg};
  --border-radius-xl: ${selectedRadius.xl};
  --font-sans: ${selectedFont.stack};
}`;

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(generatedCss);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h2>🎨 Live Theme Sandbox</h2>
            <p>Customize brand colors, border radius, and typography live across all 35 components.</p>
          </div>
          <button type="button" onClick={onClose} className={styles.closeBtn} aria-label="Close customizer">
            &times;
          </button>
        </div>

        <div className={styles.body}>
          {/* Brand Primary Color */}
          <section className={styles.section}>
            <h3>Brand Interactive Color</h3>
            <div className={styles.colorGrid}>
              {COLOR_PRESETS.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  className={`${styles.colorChip} ${selectedColor.hex === c.hex ? styles.active : ''}`}
                  onClick={() => handleColorChange(c)}
                  title={c.name}
                  style={{ backgroundColor: c.hex }}
                >
                  {selectedColor.hex === c.hex && <span>✓</span>}
                </button>
              ))}
            </div>
            <span className={styles.currentValue}>Selected: <strong>{selectedColor.name} ({selectedColor.hex})</strong></span>
          </section>

          {/* Border Radius */}
          <section className={styles.section}>
            <h3>Corner Radius Scale</h3>
            <div className={styles.pillList}>
              {RADIUS_PRESETS.map((r) => (
                <button
                  key={r.name}
                  type="button"
                  className={`${styles.pillBtn} ${selectedRadius.name === r.name ? styles.active : ''}`}
                  onClick={() => handleRadiusChange(r)}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </section>

          {/* Font Family */}
          <section className={styles.section}>
            <h3>Typography Stack</h3>
            <div className={styles.pillList}>
              {FONT_PRESETS.map((f) => (
                <button
                  key={f.name}
                  type="button"
                  className={`${styles.pillBtn} ${selectedFont.name === f.name ? styles.active : ''}`}
                  onClick={() => handleFontChange(f)}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </section>

          {/* Live CSS Output */}
          <section className={styles.section}>
            <div className={styles.codeHeader}>
              <h3>Exported CSS Tokens</h3>
              <button type="button" onClick={handleCopy} className={styles.copyBtn}>
                {copied ? '✓ Copied' : 'Copy CSS'}
              </button>
            </div>
            <pre className={styles.codePreview}>
              <code>{generatedCss}</code>
            </pre>
          </section>
        </div>

        <div className={styles.footer}>
          <button type="button" onClick={handleReset} className={styles.resetBtn}>
            Reset to Default
          </button>
          <button type="button" onClick={onClose} className={styles.doneBtn}>
            Keep & Close
          </button>
        </div>
      </div>
    </div>
  );
};
