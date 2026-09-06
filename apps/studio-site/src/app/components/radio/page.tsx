import React from 'react';
import { RadioData } from '@/content/components/radio';
import RadioPlayground from '@/components/playgrounds/RadioPlayground';
import { WcagChecklist, DosDonts, TabSection, DesignTokenRef } from '@/components/docs';

export default function RadioPage() {
  return (
    <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 8px' }}>{RadioData.title}</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary, #666)', margin: 0 }}>{RadioData.description}</p>
      </header>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Interactive Sandbox</h2>
        <RadioPlayground />
      </section>

      <TabSection tabs={['Usage & Architecture', 'Accessibility (WCAG 2.2)', 'Design Tokens']}>
        <div id="usage">
          <div dangerouslySetInnerHTML={{ __html: RadioData.usage.replace(/\n/g, '<br/>') }} />
          <div style={{ marginTop: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>Do\'s and Don\'ts</h3>
            <DosDonts items={RadioData.dosAndDonts as any} />
          </div>
        </div>

        <div id="accessibility">
          <p style={{ lineHeight: 1.6, marginBottom: '24px' }}>
            Every instance of <strong>{RadioData.name}</strong> satisfies strict WCAG 2.2 Level AA guidelines. Below is the audited conformance matrix:
          </p>
          <WcagChecklist criteria={RadioData.wcag as any} />
        </div>

        <div id="tokens">
          <p style={{ lineHeight: 1.6, marginBottom: '24px' }}>
            Below are the primary CSS design tokens consumed by <strong>{RadioData.name}</strong> across all themes:
          </p>
          <DesignTokenRef tokens={RadioData.tokens as any} />
        </div>
      </TabSection>
    </main>
  );
}
