'use client';
import React from 'react';
import { Switch } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function SwitchPlayground() {
  const defaultProps = {
      label: 'Enable Real-time Cloud Telemetry',
      checked: true,
      size: 'md',
      labelPosition: 'right',
      disabled: false
    };
  const controls = [
      { name: 'label', label: 'Switch Label', type: 'text' },
      { name: 'checked', label: 'Checked State', type: 'toggle' },
      { name: 'size', label: 'Size', type: 'select', options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' }
      ]},
      { name: 'labelPosition', label: 'Label Position', type: 'select', options: [
        { label: 'Right', value: 'right' },
        { label: 'Left', value: 'left' }
      ]},
      { name: 'disabled', label: 'Disabled', type: 'toggle' }
    ];

  return (
    <ControlPanel
      componentName="Switch"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
      <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
        <Switch
          label={props.label}
          checked={props.checked}
          size={props.size}
          labelPosition={props.labelPosition}
          disabled={props.disabled}
        />
      </div>
    )}
    />
  );
}
