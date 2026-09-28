'use client';
import React from 'react';
import { Tabs } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function TabsPlayground() {
  const defaultProps = {
    variant: 'line',
    orientation: 'horizontal',
    size: 'md',
  };

  const controls = [
    {
      name: 'variant',
      label: 'Variant',
      type: 'select',
      options: [
        { label: 'Line (Underline)', value: 'line' },
        { label: 'Enclosed (Folder)', value: 'enclosed' },
        { label: 'Pills (Chips)', value: 'pills' },
      ],
    },
    {
      name: 'orientation',
      label: 'Orientation',
      type: 'select',
      options: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
      ],
    },
    {
      name: 'size',
      label: 'Size',
      type: 'select',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
    },
  ];

  const sampleTabs = [
    {
      id: 'tab1',
      label: 'Design Tokens',
      content: (
        <div style={{ padding: '16px', background: 'var(--color-background-subtle)', borderRadius: '8px' }}>
          <h4>Token Architecture</h4>
          <p>Tokens form the foundational contract between design and development across 6 systems.</p>
        </div>
      ),
    },
    {
      id: 'tab2',
      label: 'Components',
      content: (
        <div style={{ padding: '16px', background: 'var(--color-background-subtle)', borderRadius: '8px' }}>
          <h4>Modular React Library</h4>
          <p>35 accessible components with keyboard navigation, ARIA semantics, and token binding.</p>
        </div>
      ),
    },
    {
      id: 'tab3',
      label: 'Accessibility',
      content: (
        <div style={{ padding: '16px', background: 'var(--color-background-subtle)', borderRadius: '8px' }}>
          <h4>WCAG 2.2 AA / AAA</h4>
          <p>Audited color contrast ratios, focus rings, and screen-reader announcements.</p>
        </div>
      ),
    },
  ];

  return (
    <ControlPanel
      componentName="Tabs"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
        <div style={{ width: '100%', maxWidth: '640px', margin: '0 auto', padding: '16px' }}>
          <Tabs
            tabs={sampleTabs}
            variant={props.variant}
            orientation={props.orientation}
            size={props.size}
          />
        </div>
      )}
    />
  );
}