import React from 'react';
import styles from './page.module.scss';

export default function TypographyPage() {
  return (
    <div className={styles.root}>
      <header className={styles.hero}>
        <h1>Typography System</h1>
        <p>Robust and scalable typography tailored for readability and expressiveness.</p>
      </header>

      <section className={styles.typeScale}>
        <h2>Type Scale</h2>
        <p>24 steps rendered as a live specimen.</p>
        <div className={styles.scaleSpecimen}>
           {/* Example scale item */}
           <div className={styles.scaleItem}>
             <span className={styles.specimenText} style={{ fontSize: '2rem' }}>The quick brown fox</span>
             <span className={styles.specimenDetails}>2rem (32px) / 1.2 / -0.02em</span>
           </div>
        </div>
      </section>

      <section className={styles.fontFamilies}>
        <h2>Font Families</h2>
        <div className={styles.familySpecimen} style={{ fontFamily: 'var(--font-sans)' }}>
          <h3>Sans Serif (Inter)</h3>
          <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>abcdefghijklmnopqrstuvwxyz<br/>0123456789</p>
        </div>
      </section>

      <section className={styles.fontWeights}>
        <h2>Font Weights</h2>
        {/* Weights loop */}
      </section>

      <section className={styles.lineHeights}>
        <h2>Line Heights</h2>
        {/* Line heights demonstration */}
      </section>

      <section className={styles.textStyles}>
        <h2>Text Styles</h2>
        {/* Named styles */}
      </section>

      <section className={styles.calculator}>
        <h2>Type Scale Calculator</h2>
        {/* Interactive calculator (would be a client component) */}
      </section>
    </div>
  );
}
