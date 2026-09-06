'use client';
import React from 'react';
import { Card } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function CardPlayground() {
  const defaultProps = {
      padding: 'lg',
      shadow: 'md',
      bordered: true,
      hoverable: true
    };
  const controls = [
      { name: 'padding', label: 'Padding', type: 'select', options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' }
      ]},
      { name: 'shadow', label: 'Shadow Depth', type: 'select', options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' }
      ]},
      { name: 'bordered', label: 'Show Border', type: 'toggle' },
      { name: 'hoverable', label: 'Hover Elevation Lift', type: 'toggle' }
    ];

  return (
    <ControlPanel
      componentName="Card"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
      <div style={{ maxWidth: '420px', width: '100%', margin: '0 auto' }}>
        <Card
          padding={props.padding}
          shadow={props.shadow}
          bordered={props.bordered}
          hoverable={props.hoverable}
          header={<div style={{ fontWeight: 600, fontSize: '1.1rem' }}>Infrastructure Analytics</div>}
          footer={<div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.875rem', color: '#666' }}>Updated 2m ago</div>}
        >
          <p style={{ margin: '0 0 12px', lineHeight: 1.6 }}>
            Cluster nodes are operating at 99.98% reliability across 6 distributed geographic regions.
          </p>
        </Card>
      </div>
    )}
    />
  );
}
