import React from 'react';
import styles from './page.module.scss';

export default function BorderPage() {
  return (
    <div className={styles.root}>
      <header className={styles.hero}>
        <h1>Border System</h1>
        <p>Standardizing shapes and boundaries.</p>
      </header>

      <section className={styles.radiusGallery}>
        <h2>Radius Gallery</h2>
        {/* 10 radii shown as squares */}
      </section>

      <section className={styles.widthGallery}>
        <h2>Width Gallery</h2>
        {/* 6 widths shown as horizontal lines */}
      </section>

      <section className={styles.combinations}>
        <h2>Combinations</h2>
        {/* Border radius × width × style combination previewer */}
      </section>
    </div>
  );
}
