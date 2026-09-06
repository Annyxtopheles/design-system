import React from 'react';
import ButtonPlayground from '@/components/playgrounds/ButtonPlayground';
import { WcagChecklist, DosDonts, TabSection, DesignTokenRef } from '@/components/docs';

const buttonWcag = [
  { sc: '2.1.1', level: 'A' as const, name: 'Keyboard', description: 'Accessible via Tab key and activated via Space/Enter.' },
  { sc: '4.1.2', level: 'A' as const, name: 'Name, Role, Value', description: 'Uses native button role and accessible name.' },
  { sc: '2.4.7', level: 'AA' as const, name: 'Focus Visible', description: 'Clear focus ring when keyboard navigated.' },
  { sc: '1.4.3', level: 'AA' as const, name: 'Contrast (Minimum)', description: 'Text contrast meets 4.5:1.' },
  { sc: '2.5.3', level: 'A' as const, name: 'Label in Name', description: 'Visible text is included in accessible name.' }
];

const buttonTokens = [
  { name: '--color-interactive-primary', description: 'Primary action fill' },
  { name: '--color-interactive-primaryHover', description: 'Hover state background' },
  { name: '--color-interactive-primaryActive', description: 'Active press state' },
  { name: '--color-text-onBrand', description: 'High contrast text on brand color' },
  { name: '--border-radius-lg', description: 'Standard button corner rounding' },
  { name: '--spacing-inset-md', description: 'Default internal padding' },
  { name: '--motion-duration-moderate', description: 'Hover and focus transition duration' }
];

export default function ButtonPage() {
  return (
    <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 8px' }}>Button</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary, #666)', margin: 0 }}>
          Interactive tactile button component supporting primary, secondary, ghost, and danger variants with loading states.
        </p>
      </header>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Interactive Sandbox</h2>
        <ButtonPlayground />
      </section>

      <TabSection tabs={['Usage & Architecture', 'Accessibility (WCAG 2.2)', 'Design Tokens']}>
        <div id="usage">
          <h3>When to Use</h3>
          <p style={{ lineHeight: 1.6 }}>
            Primary vs secondary vs ghost buttons represent the foundational hierarchy of actions in our application. Primary buttons should be used exactly once per screen or context block to indicate the main action. They draw the user&apos;s attention and drive them towards the intended conversion or primary workflow step.
          </p>
          <h3>Interaction Model</h3>
          <p style={{ lineHeight: 1.6 }}>
            Buttons respond to cursor hover, press states, and keyboard Enter/Space. When loading is set, interaction is automatically blocked and an accessible circular spinner is rendered in place of or alongside the label.
          </p>
          <div style={{ marginTop: '24px' }}>
            <h3>Do&apos;s and Don&apos;ts</h3>
            <DosDonts items={[
              { type: 'do', description: 'Use primary buttons for the single most important action on a view.' },
              { type: 'dont', description: 'Do not use buttons as inline text links or for standard page-to-page navigation.' }
            ] as any} />
          </div>
        </div>

        <div id="accessibility">
          <p style={{ lineHeight: 1.6, marginBottom: '24px' }}>
            The Button component conforms to WCAG 2.2 Level AA guidelines. Below is the audited conformance checklist:
          </p>
          <WcagChecklist criteria={buttonWcag as any} />
        </div>

        <div id="tokens">
          <p style={{ lineHeight: 1.6, marginBottom: '24px' }}>
            Consumes the following custom properties from the design token engine:
          </p>
          <DesignTokenRef tokens={buttonTokens as any} />
        </div>
      </TabSection>
    </main>
  );
}
