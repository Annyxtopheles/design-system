'use client';

import React, { useState } from 'react';
import styles from './page.module.scss';

export default function MotionPage() {
  const [playTrigger, setPlayTrigger] = useState(0);

  const durations = [
    { name: 'faster', ms: '75ms', desc: 'Instant micro-interactions (checkboxes, radio pips)' },
    { name: 'fast', ms: '100ms', desc: 'Button color shifts, simple hover luminance' },
    { name: 'normal', ms: '150ms', desc: 'Tooltips, badge transitions, small dropdowns' },
    { name: 'moderate', ms: '200ms', desc: 'Card expansion, accordion height, tab indicator' },
    { name: 'slow', ms: '300ms', desc: 'Modal entrance, toast pop-in, popovers' },
    { name: 'slower', ms: '400ms', desc: 'Drawer sliding panels, sidebar rail collapse' },
    { name: 'slowest', ms: '500ms', desc: 'Full-screen transitions, complex checkout step shifts' },
    { name: 'glacial', ms: '1000ms', desc: 'Ambient shimmer bones, pulse indicators' },
  ];

  const easings = [
    { name: 'standard', curve: 'cubic-bezier(0.2, 0, 0, 1)', desc: 'Natural balanced motion for general transitions' },
    { name: 'standardDecel', curve: 'cubic-bezier(0, 0, 0.2, 1)', desc: 'Incoming entrance motions (modals, drawers)' },
    { name: 'standardAccel', curve: 'cubic-bezier(0.4, 0, 1, 1)', desc: 'Outgoing exit motions (dismissing toasts)' },
    { name: 'spring', curve: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', desc: 'Playful overshoot pop (badges, switches, dials)' },
    { name: 'bounce', curve: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', desc: 'Tactile elastic feedback' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', maxWidth: '1040px' }}>
      <header className={styles.hero}>
        <h1>Motion & Choreography</h1>
        <p>A calibrated physical timing system consisting of 9 duration steps and 14 cubic-bezier curves, respecting prefers-reduced-motion for vestibular safety.</p>
        
        <button
          type="button"
          onClick={() => setPlayTrigger((p) => p + 1)}
          style={{
            marginTop: '16px',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            background: 'var(--color-interactive-primary)',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          ▶ Play All Motion Curves
        </button>
      </header>

      {/* Durations */}
      <section>
        <h2>Duration Steps (75ms – 1000ms)</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
          {durations.map((d) => (
            <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '24px', paddingBottom: '12px', borderBottom: '1px solid var(--color-border-subtle)' }}>
              <div style={{ width: '180px', flexShrink: 0 }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>--motion-duration-{d.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>{d.ms} • {d.desc}</div>
              </div>
              <div style={{ flex: 1, position: 'relative', height: '24px', background: 'var(--color-background-subtle)', borderRadius: '12px', overflow: 'hidden' }}>
                <div
                  key={`${d.name}-${playTrigger}`}
                  style={{
                    height: '100%',
                    width: '24px',
                    borderRadius: '12px',
                    background: 'var(--color-interactive-primary)',
                    animation: `ds-run-across var(--motion-duration-${d.name}, ${d.ms}) var(--motion-easing-standard) forwards`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Easing Curves */}
      <section>
        <h2>Cubic-Bezier Easing Physics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '16px' }}>
          {easings.map((e) => (
            <div key={e.name} style={{ border: '1px solid var(--color-border-default)', borderRadius: '12px', padding: '20px', background: 'var(--color-surface-card)' }}>
              <h3 style={{ margin: '0 0 4px', fontSize: '1.05rem', textTransform: 'capitalize' }}>{e.name}</h3>
              <code style={{ fontSize: '0.75rem', color: 'var(--color-text-brand)' }}>{e.curve}</code>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: '8px 0 16px' }}>{e.desc}</p>

              <div style={{ position: 'relative', height: '36px', background: 'var(--color-background-subtle)', borderRadius: '18px', padding: '4px' }}>
                <div
                  key={`${e.name}-${playTrigger}`}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'var(--color-interactive-primary)',
                    animation: `ds-run-across 600ms ${e.curve} forwards`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Accessibility / Reduced Motion */}
      <section style={{ border: '1px solid var(--color-border-default)', borderRadius: '12px', padding: '24px', background: 'var(--color-surface-card)' }}>
        <h2>Vestibular Accessibility (WCAG 2.2 SC 2.3.3)</h2>
        <p style={{ lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
          When users enable <code>prefers-reduced-motion: reduce</code> at the operating system level, our design token engine automatically sets all duration tokens to <code>0ms</code>, instantly suppressing animations while preserving state visibility.
        </p>
      </section>

      <style jsx global>{`
        @keyframes ds-run-across {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(100% - 28px)); }
        }
      `}</style>
    </div>
  );
}
