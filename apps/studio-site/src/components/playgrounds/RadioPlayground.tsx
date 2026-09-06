'use client';
import React from 'react';
import { Radio, RadioGroup } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function RadioPlayground() {
  const defaultProps = {
      label: 'Select Deployment Strategy',
      orientation: 'vertical',
      disabled: false,
      error: ''
    };
  const controls = [
      { name: 'label', label: 'Group Label', type: 'text' },
      { name: 'orientation', label: 'Orientation', type: 'select', options: [
        { label: 'Vertical', value: 'vertical' },
        { label: 'Horizontal', value: 'horizontal' }
      ]},
      { name: 'disabled', label: 'Group Disabled', type: 'toggle' },
      { name: 'error', label: 'Error', type: 'text' }
    ];

  return (
    <ControlPanel
      componentName="Radio"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
      <div style={{ maxWidth: '450px', width: '100%', margin: '0 auto' }}>
        <RadioGroup
          name="deployment-strategy"
          label={props.label}
          orientation={props.orientation}
          disabled={props.disabled}
          error={props.error || undefined}
          value="canary"
          options={[
            { label: 'Rolling Update (Zero Downtime)', value: 'rolling' },
            { label: 'Canary Deployment (10% Traffic)', value: 'canary' },
            { label: 'Blue/Green Switchover', value: 'blue-green' }
          ]}
        />
      </div>
    )}
    />
  );
}
