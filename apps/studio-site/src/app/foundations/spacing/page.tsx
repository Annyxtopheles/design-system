import React from 'react';
import styles from './page.module.scss';

export default function SpacingPage() {
  return (
    <div className={styles.root}>
      <header className={styles.hero}>
        <h1>Spacing System</h1>
        <p>A comprehensive spatial system for consistent layouts.</p>
      </header>

      <section className={styles.gridVisualizer}>
        <h2>Grid Visualizer</h2>
        {/* Interactive grid overlay component */}
      </section>

      <section className={styles.spacingScale}>
        <h2>Spacing Scale</h2>
        {/* 24 steps shown as colored bars */}
      </section>

      <section className={styles.namedAliases}>
        <h2>Named Aliases</h2>
        {/* Table showing named tokens */}
      </section>

      <section className={styles.layoutTokens}>
        <h2>Layout Tokens</h2>
        {/* Container widths, header/sidebar heights visualized */}
      </section>

      <section className={styles.patterns}>
        <h2>Inset, Stack & Inline</h2>
        {/* Visual demonstrations */}
      </section>
    </div>
  );
}
