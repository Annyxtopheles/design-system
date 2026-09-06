import React from 'react';
import { ToastData } from '@/content/components/toast';
import ToastPlayground from '@/components/playgrounds/ToastPlayground';
import { WcagChecklist, DosDonts, TabSection, DesignTokenRef } from '@/components/docs';

export default function ToastPage() {
  return (
    <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 8px' }}>{ToastData.title}</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary, #666)', margin: 0 }}>{ToastData.description}</p>
      </header>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Interactive Sandbox</h2>
        <ToastPlayground />
      </section>

      <TabSection tabs={['Usage & Architecture', 'Accessibility (WCAG 2.2)', 'Design Tokens']}>
        <div id="usage">
          <div dangerouslySetInnerHTML={{ __html: ToastData.usage.replace(/\n/g, '<br/>') }} />
          <div style={{ marginTop: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>Do\'s and Don\'ts</h3>
            <DosDonts items={ToastData.dosAndDonts as any} />
          </div>
        </div>

        <div id="accessibility">
          <p style={{ lineHeight: 1.6, marginBottom: '24px' }}>
            Every instance of <strong>{ToastData.name}</strong> satisfies strict WCAG 2.2 Level AA guidelines. Below is the audited conformance matrix:
          </p>
          <WcagChecklist criteria={ToastData.wcag as any} />
        </div>

        <div id="tokens">
          <p style={{ lineHeight: 1.6, marginBottom: '24px' }}>
            Below are the primary CSS design tokens consumed by <strong>{ToastData.name}</strong> across all themes:
          </p>
          <DesignTokenRef tokens={ToastData.tokens as any} />
        </div>
      </TabSection>
    </main>
  );
}
