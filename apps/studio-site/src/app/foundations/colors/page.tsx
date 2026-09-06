import React from 'react';
import styles from './page.module.scss';

export default function ColorsPage() {
  return (
    <div className={styles.root}>
      <header className={styles.hero}>
        <h1>Color System</h1>
        <p>Our 4-theme approach to scalable, accessible color palettes across all platforms.</p>
      </header>

      <section className={styles.themeSwitcher}>
        <h2>Theme Switcher</h2>
        <div className={styles.buttons}>
          <button>Light</button>
          <button>Dark</button>
          <button>High Contrast</button>
          <button>Cosmic Neon</button>
        </div>
      </section>

      <section className={styles.paletteSection}>
        <h2>Core Palette</h2>
        <p>11 hues × 12 steps</p>
        <div className={styles.swatchGrid}>
          {/* Swatches would go here */}
          <div className={styles.swatchRow}>
            <span>Blue</span>
            <div className={styles.swatches}>
              {Array.from({length: 12}).map((_, i) => (
                <div key={i} className={styles.swatch} style={{ backgroundColor: `var(--color-blue-${(i+1)*100})` }}></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.semanticColors}>
        <h2>Semantic Color Mapping</h2>
        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>Light</th>
              <th>Dark</th>
              <th>Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>--color-bg-primary</code></td>
              <td>#FFFFFF</td>
              <td>#121212</td>
              <td>Main application background</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.contrastRatios}>
        <h2>Contrast Ratios</h2>
        <div className={styles.contrastGrid}>
          {/* Text on background examples */}
        </div>
      </section>

      <section className={styles.cosmicNeon}>
        <h2>Cosmic Neon Showcase</h2>
        <div className={styles.neonContainer}>
          <div className={styles.neonText}>Glowing Future</div>
        </div>
      </section>
    </div>
  );
}
