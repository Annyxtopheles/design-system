'use client';
import React from 'react';
import { Badge } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function BadgePlayground() {
  const defaultProps = {
      text: 'Production Stable',
      variant: 'success',
      size: 'md',
      dot: false,
      removable: false
    };
  const controls = [
      { name: 'text', label: 'Badge Text', type: 'text' },
      { name: 'variant', label: 'Variant', type: 'select', options: [
        { label: 'Default', value: 'default' },
        { label: 'Primary', value: 'primary' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
        { label: 'Info', value: 'info' }
      ]},
      { name: 'size', label: 'Size', type: 'select', options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' }
      ]},
      { name: 'dot', label: 'Dot Mode', type: 'toggle' },
      { name: 'removable', label: 'Removable (X)', type: 'toggle' }
    ];

  return (
    <ControlPanel
      componentName="Badge"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60px' }}>
        <Badge
          variant={props.variant}
          size={props.size}
          dot={props.dot}
          removable={props.removable}
        >
          {props.text}
        </Badge>
      </div>
    )}
    />
  );
}
