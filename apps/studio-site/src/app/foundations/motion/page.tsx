import React from 'react';
import styles from './page.module.scss';

export default function MotionPage() {
  return (
    <div className={styles.root}>
      <header className={styles.hero}>
        <h1>Motion System</h1>
        <p>Adding life and continuity to interactions.</p>
      </header>

      <section className={styles.durationScale}>
        <h2>Duration Scale</h2>
        {/* Bouncing ball animation for 9 durations */}
      </section>

      <section className={styles.easingCurves}>
        <h2>Easing Curves</h2>
        {/* SVG bezier curves + previews */}
      </section>

      <section className={styles.transitionPresets}>
        <h2>Transition Presets</h2>
        {/* Fade, slide, scale, expand, bounce demonstrations */}
      </section>

      <section className={styles.reducedMotion}>
        <h2>Reduced Motion</h2>
        {/* prefers-reduced-motion behavior preview */}
      </section>
    </div>
  );
}
