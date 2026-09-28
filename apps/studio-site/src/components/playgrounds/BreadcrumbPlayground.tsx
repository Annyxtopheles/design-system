'use client';
import React from 'react';
import { Breadcrumb } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function BreadcrumbPlayground() {
  const defaultProps = {
    separator: '/',
    maxItems: 4,
  };

  const controls = [
    {
      name: 'separator',
      label: 'Separator',
      type: 'select',
      options: [
        { label: 'Slash (/)', value: '/' },
        { label: 'Chevron (>)', value: '>' },
        { label: 'Arrow (→)', value: '→' },
        { label: 'Bullet (•)', value: '•' },
      ],
    },
    {
      name: 'maxItems',
      label: 'Max Items (Collapse)',
      type: 'select',
      options: [
        { label: 'None (show all)', value: 0 },
        { label: '3 items', value: 3 },
        { label: '4 items', value: 4 },
      ],
    },
  ];

  const items = [
    { label: 'Home', href: '#' },
    { label: 'Products', href: '#' },
    { label: 'Electronics', href: '#' },
    { label: 'Audio', href: '#' },
    { label: 'Headphones', href: '#' },
  ];

  return (
    <ControlPanel
      componentName="Breadcrumb"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
        <div style={{ padding: '24px', display: 'flex', justifyContent: 'center' }}>
          <Breadcrumb
            items={items}
            separator={props.separator}
            maxItems={props.maxItems || undefined}
          />
        </div>
      )}
    />
  );
}