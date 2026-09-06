'use client';
import React from 'react';
import { Spinner } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function SpinnerPlayground() {
  const defaultProps = {
      size: 'lg',
      color: 'primary',
      label: 'Loading asset bundle...',
      overlay: false
    };
  const controls = [
      { name: 'size', label: 'Size', type: 'select', options: [
        { label: 'Extra Small', value: 'xs' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' }
      ]},
      { name: 'color', label: 'Color Style', type: 'select', options: [
        { label: 'Primary Brand', value: 'primary' },
        { label: 'Inherit CurrentColor', value: 'inherit' }
      ]},
      { name: 'label', label: 'Accessible Label', type: 'text' },
      { name: 'overlay', label: 'Overlay Backdrop', type: 'toggle' }
    ];

  return (
    <ControlPanel
      componentName="Spinner"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '120px', position: 'relative' }}>
        <Spinner
          size={props.size}
          color={props.color}
          label={props.label}
          overlay={props.overlay}
        />
      </div>
    )}
    />
  );
}
