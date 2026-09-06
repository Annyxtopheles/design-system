import React from 'react';
import styles from './page.module.scss';

export default function ElevationPage() {
  return (
    <div className={styles.root}>
      <header className={styles.hero}>
        <h1>Elevation System</h1>
        <p>Conveying depth and spatial relationships.</p>
      </header>

      <section className={styles.shadowGallery}>
        <h2>Shadow Gallery</h2>
        {/* 12 levels of shadows */}
      </section>

      <section className={styles.themeComparison}>
        <h2>Theme Comparison</h2>
        {/* Toggle between themes */}
      </section>

      <section className={styles.shadowBuilder}>
        <h2>Shadow Builder</h2>
        {/* Interactive client component */}
      </section>

      <section className={styles.usageGuide}>
        <h2>Usage Guide</h2>
        <p>Guidelines on when to use which elevation level.</p>
      </section>
    </div>
  );
}
