'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { TabSection } from './TabSection';
import { DosDonts } from './DosDonts';
import { WcagChecklist } from './WcagChecklist';
import { DesignTokenRef } from './DesignTokenRef';
import { MarkdownRenderer } from './MarkdownRenderer';
import styles from './ComponentDocTemplate.module.scss';

export interface ComponentDocTemplateProps {
  title: string;
  name: string;
  description: string;
  playground: React.ReactNode;
  usageMarkdown: string;
  wcag?: any[];
  dosAndDonts?: any[];
  tokens?: any[];
  wcagLevel?: 'AA' | 'AAA' | 'A';
}

export const ComponentDocTemplate: React.FC<ComponentDocTemplateProps> = ({
  title,
  name,
  description,
  playground,
  usageMarkdown,
  wcag = [],
  dosAndDonts = [],
  tokens = [],
  wcagLevel = 'AA',
}) => {
  const [copied, setCopied] = useState(false);
  const importCode = `import { ${name} } from '@design-system/components';`;

  const copyImport = () => {
    navigator.clipboard.writeText(importCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.root}>
      {/* Breadcrumb nav */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className={styles.separator}>/</span>
        <Link href="/components/button">Components</Link>
        <span className={styles.separator}>/</span>
        <span className={styles.current}>{name}</span>
      </nav>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.title}>{title || name}</h1>
          <span className={styles.wcagBadge}>WCAG {wcagLevel}</span>
        </div>
        <p className={styles.description}>{description}</p>

        {/* Quick import copy block */}
        <div className={styles.importBar}>
          <code className={styles.importCode}>{importCode}</code>
          <button
            type="button"
            className={styles.copyBtn}
            onClick={copyImport}
            aria-label="Copy import statement"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </header>

      {/* Live Sandbox */}
      <section className={styles.sandboxSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Interactive Sandbox</h2>
          <span className={styles.sectionHint}>Live component preview & real-time prop controls</span>
        </div>
        <div className={styles.playgroundWrapper}>
          {playground}
        </div>
      </section>

      {/* Tabbed Documentation */}
      <TabSection tabs={['Usage & Architecture', 'Accessibility (WCAG 2.2)', 'Design Tokens']}>
        <div id="usage" className={styles.tabPane}>
          <MarkdownRenderer content={usageMarkdown} />
          {dosAndDonts && dosAndDonts.length > 0 && (
            <div className={styles.dosDontsSection}>
              <h3 className={styles.subHeading}>Do&apos;s and Don&apos;ts</h3>
              <DosDonts items={dosAndDonts} />
            </div>
          )}
        </div>

        <div id="accessibility" className={styles.tabPane}>
          <p className={styles.tabIntro}>
            Every instance of <strong>{name}</strong> satisfies strict WCAG 2.2 Level {wcagLevel} accessibility standards. Below is the audited conformance matrix:
          </p>
          <WcagChecklist criteria={wcag} />
        </div>

        <div id="tokens" className={styles.tabPane}>
          <p className={styles.tabIntro}>
            Below are the primary CSS custom properties consumed by <strong>{name}</strong> across all themes:
          </p>
          <DesignTokenRef tokens={tokens} />
        </div>
      </TabSection>
    </div>
  );
};

export default ComponentDocTemplate;
