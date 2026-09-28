'use client';

import React from 'react';
import styles from './ExportTokensModal.module.scss';

interface ExportTokensModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportTokensModal: React.FC<ExportTokensModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const downloadLinks = [
    {
      title: 'Figma Variables (W3C DTCG Format)',
      filename: 'tokens.dtcg.json',
      url: '/tokens/tokens.dtcg.json',
      badge: 'Recommended for Figma',
      desc: 'Conforms to the W3C Design Token Community Group specification ($value, $type). Compatible with Figma Variables native import.',
      instructions: 'In Figma: Go to Local Variables > Import > Select tokens.dtcg.json to populate all Color, Dimension, and Radius variables.',
    },
    {
      title: 'Tokens Studio for Figma (JSON Sets)',
      filename: 'tokens.tokens-studio.json',
      url: '/tokens/tokens.tokens-studio.json',
      badge: 'Tokens Studio Plugin',
      desc: 'Multi-set JSON including global, light, dark, accessibility-high-contrast, and cosmic-neon collections.',
      instructions: 'In Figma Tokens Studio plugin: Click Settings > Load from Local File / Sync > Select tokens.tokens-studio.json.',
    },
    {
      title: 'CSS Custom Properties (Standalone)',
      filename: 'tokens.css',
      url: '/tokens/tokens.css',
      badge: 'Web & Frontend',
      desc: 'Production-ready CSS variables stylesheet scoping all 4 themes (:root, [data-theme="dark"], high-contrast, cosmic-neon).',
      instructions: 'In web apps: import "@design-system/tokens/dist/tokens.css" or link directly in your HTML <head>.',
    },
    {
      title: 'Resolved Token Manifest (JSON)',
      filename: 'tokens.json',
      url: '/tokens/tokens.json',
      badge: 'Full Manifest',
      desc: 'Deeply nested JSON structure of all 1,114 tokens with resolved alias values.',
      instructions: 'Ideal for custom build pipelines, style-dictionary transforms, or headless scripts.',
    },
  ];

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h2>Export Design Tokens for Figma & Web</h2>
            <p>1,114 verified tokens formatted for designer tooling, Figma Variables, and web applications.</p>
          </div>
          <button type="button" onClick={onClose} className={styles.closeBtn} aria-label="Close modal">
            &times;
          </button>
        </div>

        <div className={styles.cardsGrid}>
          {downloadLinks.map((item) => (
            <div key={item.filename} className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h3>{item.title}</h3>
                  <span className={styles.badge}>{item.badge}</span>
                </div>
                <a
                  href={item.url}
                  download={item.filename}
                  className={styles.downloadBtn}
                >
                  <span>⬇</span> Download {item.filename}
                </a>
              </div>
              <p className={styles.cardDesc}>{item.desc}</p>
              <div className={styles.instructions}>
                <strong>How to use:</strong> {item.instructions}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <span>Format: <strong>W3C DTCG 2024.1 + Tokens Studio v2</strong></span>
          <button type="button" onClick={onClose} className={styles.doneBtn}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
