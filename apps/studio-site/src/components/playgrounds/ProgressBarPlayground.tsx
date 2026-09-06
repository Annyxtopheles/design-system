'use client';
import React from 'react';
import { ProgressBar } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function ProgressBarPlayground() {
  const defaultProps = {
      value: 68,
      variant: 'linear',
      color: 'primary',
      showValue: true,
      indeterminate: false
    };
  const controls = [
      { name: 'value', label: 'Progress % (Slider)', type: 'slider', min: 0, max: 100, step: 1 },
      { name: 'variant', label: 'Geometry', type: 'select', options: [
        { label: 'Linear Bar', value: 'linear' },
        { label: 'Circular Arc', value: 'circular' }
      ]},
      { name: 'color', label: 'Color Hue', type: 'select', options: [
        { label: 'Primary Brand', value: 'primary' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' }
      ]},
      { name: 'showValue', label: 'Show Value Label', type: 'toggle' },
      { name: 'indeterminate', label: 'Indeterminate Loop', type: 'toggle' }
    ];

  return (
    <ControlPanel
      componentName="ProgressBar"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
      <div style={{ maxWidth: '450px', width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
        <ProgressBar
          value={props.value}
          variant={props.variant}
          color={props.color}
          showValue={props.showValue}
          indeterminate={props.indeterminate}
          label="Database Backup"
        />
      </div>
    )}
    />
  );
}
