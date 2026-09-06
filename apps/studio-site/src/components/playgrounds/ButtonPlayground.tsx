'use client';
import React from 'react';
import { Button } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function ButtonPlayground() {
  const defaultProps = {
    text: 'Trigger Action',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
  };

  const controls = [
    { name: 'text', label: 'Button Label', type: 'text' },
    { name: 'variant', label: 'Variant', type: 'select', options: [
      { label: 'Primary', value: 'primary' },
      { label: 'Secondary', value: 'secondary' },
      { label: 'Ghost', value: 'ghost' },
      { label: 'Danger', value: 'danger' },
      { label: 'Link', value: 'link' },
    ]},
    { name: 'size', label: 'Size', type: 'select', options: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
    ]},
    { name: 'disabled', label: 'Disabled State', type: 'toggle' },
    { name: 'loading', label: 'Loading Spinner', type: 'toggle' },
    { name: 'fullWidth', label: 'Full Width', type: 'toggle' },
  ];

  return (
    <ControlPanel
      componentName="Button"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80px' }}>
          <Button
            variant={props.variant}
            size={props.size}
            disabled={props.disabled}
            loading={props.loading}
            fullWidth={props.fullWidth}
          >
            {props.text}
          </Button>
        </div>
      )}
    />
  );
}
