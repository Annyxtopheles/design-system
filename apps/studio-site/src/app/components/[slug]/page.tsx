import React from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { playgroundMap } from '@/components/playgrounds';
import { 
  TabSection, 
  CodeBlock, 
  ControlPanel, 
  DosDonts, 
  WcagBadge, 
  WcagChecklist, 
  DesignTokenRef, 
  PropsTable 
} from '@/components/docs';

import styles from './page.module.scss';

// Mock list of components to generate static params
const componentsList = [
  'button', 'input', 'checkbox', 'radio', 'switch', 'slider', 'tooltip', 'popover', 'modal', 'dialog',
  'tabs', 'accordion', 'card', 'avatar', 'badge', 'alert', 'toast', 'progress', 'spinner', 'skeleton',
  'menu', 'dropdown', 'select', 'autocomplete', 'datepicker', 'timepicker', 'table', 'pagination', 'breadcrumb', 'stepper',
  'drawer', 'tooltip', 'slider', 'rating', 'carousel'
];

export function generateStaticParams() {
  return componentsList.map((slug) => ({
    slug,
  }));
}

export default async function ComponentPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  let content;
  try {
    const mod = await import(`@/content/components/${slug}`);
    content = mod.default || mod;
  } catch (error) {
    // Fallback or not found
    return notFound();
  }

  const PlaygroundLoader = playgroundMap[slug];
  const PlaygroundComponent = PlaygroundLoader ? dynamic(PlaygroundLoader, { loading: () => <p>Loading playground...</p> }) : null;

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className={styles.tabContent}>
          <header className={styles.hero}>
            <h1>{content.name}</h1>
            <span className={styles.statusBadge}>{content.status}</span>
            <p className={styles.description}>{content.description}</p>
          </header>
          
          <section>
            <h2>Quick Start</h2>
            <CodeBlock code={content.quickStartCode} language="tsx" />
          </section>

          <section>
            <h2>Live Playground</h2>
            {PlaygroundComponent ? <PlaygroundComponent /> : <div>No playground available</div>}
          </section>

          <section>
            <h2>Anatomy</h2>
            {/* AnatomyDiagram goes here */}
            <div className={styles.anatomyDiagram}>Anatomy Diagram Placeholder</div>
          </section>

          <section>
            <h2>Variants</h2>
            <div className={styles.variantsGrid}>
              {content.variants?.map((v: any) => (
                <div key={v.name} className={styles.variantItem}>
                  <h3>{v.name}</h3>
                  <div className={styles.variantPreview}>{v.preview}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2>Do&apos;s and Don&apos;ts</h2>
            <DosDonts items={content.dosDonts || []} />
          </section>
        </div>
      )
    },
    {
      id: 'usage',
      label: 'Usage Guide',
      content: (
        <div className={styles.tabContent}>
          <h2>When to Use</h2>
          <ul>
            {content.whenToUse?.map((item: string, i: number) => <li key={i}>{item}</li>)}
          </ul>
          
          <h2>When NOT to Use</h2>
          <ul>
            {content.whenNotToUse?.map((item: string, i: number) => <li key={i}>{item}</li>)}
          </ul>

          <h2>Content Guidelines</h2>
          <div dangerouslySetInnerHTML={{ __html: content.contentGuidelinesHtml || '' }} />

          <h2>Interaction Model</h2>
          <div className={styles.callout}>
            <p>{content.interactionModel}</p>
          </div>

          <h2>Composition Patterns</h2>
          {content.compositionPatterns?.map((pattern: any, i: number) => (
            <div key={i}>
              <h3>{pattern.name}</h3>
              <CodeBlock code={pattern.code} language="tsx" />
            </div>
          ))}

          <h2>States</h2>
          <div className={styles.stateGrid}>
            {content.states?.map((state: any, i: number) => (
              <div key={i} className={styles.stateItem}>
                <strong>{state.name}</strong>
                <p>{state.description}</p>
              </div>
            ))}
          </div>

          <h2>Responsive Behavior</h2>
          <p>{content.responsiveBehavior}</p>

          <h2>Performance Considerations</h2>
          <p>{content.performanceConsiderations}</p>
        </div>
      )
    },
    {
      id: 'accessibility',
      label: 'Accessibility',
      content: (
        <div className={styles.tabContent}>
          <WcagBadge level={content.wcagLevel || 'AA'} />
          <p className={styles.a11ySummary}>{content.a11ySummary}</p>

          <h2>WCAG Criteria</h2>
          <WcagChecklist criteria={content.wcagCriteria || []} />

          <h2>ARIA Attributes</h2>
          <table className={styles.table}>
            <thead>
              <tr><th>Attribute</th><th>Purpose</th></tr>
            </thead>
            <tbody>
              {content.ariaAttributes?.map((attr: any, i: number) => (
                <tr key={i}><td><code>{attr.name}</code></td><td>{attr.purpose}</td></tr>
              ))}
            </tbody>
          </table>

          <h2>Keyboard Interactions</h2>
          <table className={styles.table}>
            <thead>
              <tr><th>Key</th><th>Action</th></tr>
            </thead>
            <tbody>
              {content.keyboardInteractions?.map((ki: any, i: number) => (
                <tr key={i}><td><kbd>{ki.key}</kbd></td><td>{ki.action}</td></tr>
              ))}
            </tbody>
          </table>

          <h2>Screen Reader Notes</h2>
          <p>{content.screenReaderNotes}</p>

          <h2>Contrast Ratios</h2>
          <table className={styles.table}>
            <thead>
              <tr><th>Element</th><th>Ratio</th></tr>
            </thead>
            <tbody>
              {content.contrastRatios?.map((cr: any, i: number) => (
                <tr key={i}><td>{cr.element}</td><td>{cr.ratio}</td></tr>
              ))}
            </tbody>
          </table>

          <h2>Focus Management</h2>
          <p>{content.focusManagement}</p>

          <h2>Reduced Motion</h2>
          <p>{content.reducedMotion}</p>
        </div>
      )
    },
    {
      id: 'design',
      label: 'Design Guidelines',
      content: (
        <div className={styles.tabContent}>
          <h2>Design Principles</h2>
          <p>{content.designPrinciples}</p>

          <h2>Design Tokens</h2>
          <DesignTokenRef tokens={content.tokens || []} />

          <h2>Spacing Anatomy</h2>
          <p>{content.spacingAnatomy}</p>

          <h2>Color Usage</h2>
          <table className={styles.table}>
            <thead>
              <tr><th>State</th><th>Token</th><th>Value</th><th>Rationale</th></tr>
            </thead>
            <tbody>
              {content.colorUsage?.map((cu: any, i: number) => (
                <tr key={i}>
                  <td>{cu.state}</td>
                  <td><code>{cu.token}</code></td>
                  <td>{cu.value}</td>
                  <td>{cu.rationale}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Motion Spec</h2>
          <table className={styles.table}>
            <thead>
              <tr><th>Property</th><th>Duration</th><th>Easing</th><th>Rationale</th></tr>
            </thead>
            <tbody>
              {content.motionSpec?.map((ms: any, i: number) => (
                <tr key={i}>
                  <td>{ms.property}</td>
                  <td>{ms.duration}</td>
                  <td>{ms.easing}</td>
                  <td>{ms.rationale}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Theming</h2>
          <p>{content.theming}</p>

          <h2>Dark Mode Notes</h2>
          <p>{content.darkModeNotes}</p>

          <h2>High Contrast Notes</h2>
          <p>{content.highContrastNotes}</p>
        </div>
      )
    },
    {
      id: 'api',
      label: 'API Reference',
      content: (
        <div className={styles.tabContent}>
          <h2>Props</h2>
          <PropsTable props={content.props || []} />

          <h2>TypeScript Types</h2>
          <CodeBlock code={content.tsTypes || ''} language="typescript" />

          <h2>CSS Custom Property Overrides</h2>
          <table className={styles.table}>
            <thead>
              <tr><th>Property</th><th>Description</th></tr>
            </thead>
            <tbody>
              {content.cssOverrides?.map((co: any, i: number) => (
                <tr key={i}><td><code>{co.property}</code></td><td>{co.description}</td></tr>
              ))}
            </tbody>
          </table>

          <h2>Examples</h2>
          {content.apiExamples?.map((ex: any, i: number) => (
            <div key={i}>
              <h3>{ex.name}</h3>
              <CodeBlock code={ex.code} language="tsx" />
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <TabSection tabs={tabs} />
    </div>
  );
}
