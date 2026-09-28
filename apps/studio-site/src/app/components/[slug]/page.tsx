import React from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { playgroundMap } from '@/components/playgrounds';
import { 
  TabSection, 
  CodeBlock, 
  DosDonts, 
  WcagBadge, 
  WcagChecklist, 
  DesignTokenRef, 
  PropsTable 
} from '@/components/docs';
import { NAV_ITEMS } from '@/lib/navigation';
import { resolveComponentDoc } from '@/lib/component-doc-resolver';
import styles from './page.module.scss';

// Generate static params for all 35 real design system components
export function generateStaticParams() {
  return NAV_ITEMS
    .filter((i) => i.group !== 'foundations')
    .map((item) => ({
      slug: item.slug.replace('components/', ''),
    }));
}

export default async function ComponentPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  let mod;
  try {
    mod = await import(`@/content/components/${slug}`);
  } catch (error) {
    return notFound();
  }

  const doc = resolveComponentDoc(slug, mod);

  const PlaygroundLoader = playgroundMap[slug];
  const PlaygroundComponent = PlaygroundLoader
    ? dynamic(PlaygroundLoader, { loading: () => <p style={{ padding: '24px' }}>Loading playground...</p> })
    : null;

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className={styles.tabContent}>
          <header className={styles.hero}>
            <div className={styles.badges}>
              <span className={styles.statusBadge}>{doc.status}</span>
              <span className={styles.wcagBadge}>WCAG {doc.wcagLevel}</span>
            </div>
            <h1>{doc.name}</h1>
            <p className={styles.description}>{doc.description}</p>
          </header>

          <section>
            <h2>Interactive Playground</h2>
            {PlaygroundComponent ? <PlaygroundComponent /> : <div>No playground available</div>}
          </section>

          <section>
            <h2>Quick Start</h2>
            <CodeBlock code={doc.quickStartCode} language="tsx" filename="App.tsx" />
          </section>

          <section>
            <h2>Component Anatomy</h2>
            <div className={styles.anatomyBox}>
              <div className={styles.diagram}>
                <span className={styles.slot}>Slot: Leading Icon</span>
                <span className={styles.slot} style={{ background: 'var(--color-interactive-primary, #2563eb)', color: '#ffffff' }}>
                  Slot: Content / Label
                </span>
                <span className={styles.slot}>Slot: Trailing Badge</span>
              </div>
              <div className={styles.legend}>
                <div className={styles.legendItem}>
                  <strong>Base:</strong> Outer structural container with border-radius token
                </div>
                <div className={styles.legendItem}>
                  <strong>Content:</strong> Text label or child elements inheriting font tokens
                </div>
                <div className={styles.legendItem}>
                  <strong>State Layer:</strong> Active focus ring and hover luminance shift
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2>Variants</h2>
            <div className={styles.variantsGrid}>
              {doc.variants.map((v) => (
                <div key={v.name} className={styles.variantItem}>
                  <div>
                    <h3>{v.name}</h3>
                    <p>{v.description}</p>
                  </div>
                  <CodeBlock code={v.code} language="tsx" />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2>Do&apos;s and Don&apos;ts</h2>
            <DosDonts items={doc.dosDonts} />
          </section>
        </div>
      ),
    },
    {
      id: 'usage',
      label: 'Usage Guide',
      content: (
        <div className={styles.tabContent}>
          <section>
            <h2>When to Use</h2>
            <ul className={styles.guidelineList}>
              {doc.whenToUse.map((item, i) => (
                <li key={i}>
                  <span className={styles.iconCheck}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>When NOT to Use</h2>
            <ul className={styles.guidelineList}>
              {doc.whenNotToUse.map((item, i) => (
                <li key={i}>
                  <span className={styles.iconCross}>✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Content Guidelines</h2>
            <p>{doc.contentGuidelines}</p>
          </section>

          <section>
            <h2>Interaction Model</h2>
            <div className={styles.callout}>
              <p>{doc.interactionModel}</p>
            </div>
          </section>

          <section>
            <h2>Composition Patterns</h2>
            <ul className={styles.guidelineList}>
              {doc.compositionPatterns.map((pat, i) => (
                <li key={i}>
                  <span className={styles.iconCheck}>•</span>
                  <span>{pat}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>States</h2>
            <div className={styles.stateGrid}>
              {doc.states.map((st, i) => (
                <div key={i} className={styles.stateItem}>
                  <strong>{st.name}</strong>
                  <p>{st.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2>Responsive Behavior</h2>
            <p>{doc.responsiveBehavior}</p>
          </section>

          <section>
            <h2>Performance Considerations</h2>
            <p>{doc.performanceConsiderations}</p>
          </section>
        </div>
      ),
    },
    {
      id: 'accessibility',
      label: 'Accessibility',
      content: (
        <div className={styles.tabContent}>
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <WcagBadge level={doc.wcagLevel === 'AAA' ? 'AAA' : 'AA'} />
              <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                Target compliance standard for this component
              </span>
            </div>
            <p>{doc.a11ySummary}</p>
          </section>

          <section>
            <h2>WCAG 2.2 Success Criteria</h2>
            <WcagChecklist criteria={doc.wcagCriteria} />
          </section>

          <section>
            <h2>ARIA Attributes & Roles</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Attribute / Role</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                {doc.ariaAttributes.map((attr, i) => (
                  <tr key={i}>
                    <td><code>{attr.name}</code></td>
                    <td>{attr.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h2>Keyboard Interactions</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{ width: '180px' }}>Key</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {doc.keyboardInteractions.map((ki, i) => (
                  <tr key={i}>
                    <td><kbd>{ki.key}</kbd></td>
                    <td>{ki.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h2>Screen Reader Notes</h2>
            <p>{doc.screenReaderNotes}</p>
          </section>

          <section>
            <h2>Contrast Ratios</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Element Pair</th>
                  <th>Contrast Ratio</th>
                  <th>WCAG 2.2 Status</th>
                </tr>
              </thead>
              <tbody>
                {doc.contrastRatios.map((cr, i) => (
                  <tr key={i}>
                    <td>{cr.element}</td>
                    <td><strong>{cr.ratio}</strong></td>
                    <td>
                      <span className={styles.wcagBadge} style={{ background: '#dcfce7', color: '#166534' }}>
                        Passes AA / AAA
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h2>Focus Management</h2>
            <p>{doc.focusManagement}</p>
          </section>

          <section>
            <h2>Reduced Motion</h2>
            <p>{doc.reducedMotion}</p>
          </section>
        </div>
      ),
    },
    {
      id: 'design',
      label: 'Design Guidelines',
      content: (
        <div className={styles.tabContent}>
          <section>
            <h2>Design Principles</h2>
            <p>{doc.designPrinciples}</p>
          </section>

          <section>
            <h2>Design Tokens</h2>
            <DesignTokenRef tokens={doc.tokens} />
          </section>

          <section>
            <h2>Spacing & Layout Anatomy</h2>
            <p>{doc.spacingAnatomy}</p>
          </section>

          <section>
            <h2>Color Usage & Tokens</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>State / Slot</th>
                  <th>Token Variable</th>
                  <th>Swatch</th>
                  <th>Rationale</th>
                </tr>
              </thead>
              <tbody>
                {doc.colorUsage.map((cu, i) => (
                  <tr key={i}>
                    <td><strong>{cu.state}</strong></td>
                    <td><code>{cu.token}</code></td>
                    <td>
                      <span className={styles.colorSwatch} style={{ backgroundColor: cu.value }} />
                      <code>{cu.value}</code>
                    </td>
                    <td>{cu.rationale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h2>Motion Specification</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Duration</th>
                  <th>Easing Function</th>
                  <th>Rationale</th>
                </tr>
              </thead>
              <tbody>
                {doc.motionSpec.map((ms, i) => (
                  <tr key={i}>
                    <td><code>{ms.property}</code></td>
                    <td><strong>{ms.duration}</strong></td>
                    <td><code>{ms.easing}</code></td>
                    <td>{ms.rationale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h2>Theming & Theme Layers</h2>
            <p>{doc.theming}</p>
            <h3>Dark Mode Notes</h3>
            <p>{doc.darkModeNotes}</p>
            <h3>High-Contrast Notes</h3>
            <p>{doc.highContrastNotes}</p>
          </section>
        </div>
      ),
    },
    {
      id: 'api',
      label: 'API Reference',
      content: (
        <div className={styles.tabContent}>
          <section>
            <h2>Props</h2>
            <PropsTable props={doc.props} />
          </section>

          <section>
            <h2>TypeScript Type Definitions</h2>
            <CodeBlock code={doc.tsTypes} language="typescript" filename={`${doc.name}.d.ts`} />
          </section>

          <section>
            <h2>CSS Custom Property Overrides</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Custom Property</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {doc.cssOverrides.map((co, i) => (
                  <tr key={i}>
                    <td><code>{co.property}</code></td>
                    <td>{co.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h2>Usage Examples</h2>
            {doc.apiExamples.map((ex, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <h3>{ex.name}</h3>
                <CodeBlock code={ex.code} language="tsx" />
              </div>
            ))}
          </section>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.pageContainer}>
      <TabSection tabs={tabs} />
    </div>
  );
}
