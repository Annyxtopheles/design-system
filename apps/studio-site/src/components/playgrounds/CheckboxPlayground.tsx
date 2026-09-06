'use client';
import React from 'react';
import { Checkbox } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function CheckboxPlayground() {
  const defaultProps = {
      label: 'I accept the end-user licensing agreement',
      checked: true,
      indeterminate: false,
      disabled: false,
      error: '',
      hint: 'Must be agreed upon before provisioning account.'
    };
  const controls = [
      { name: 'label', label: 'Label', type: 'text' },
      { name: 'checked', label: 'Checked State', type: 'toggle' },
      { name: 'indeterminate', label: 'Indeterminate (Mixed)', type: 'toggle' },
      { name: 'disabled', label: 'Disabled', type: 'toggle' },
      { name: 'error', label: 'Error Message', type: 'text' },
      { name: 'hint', label: 'Hint Text', type: 'text' }
    ];

  return (
    <ControlPanel
      componentName="Checkbox"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
      <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
        <Checkbox
          label={props.label}
          checked={props.checked}
          indeterminate={props.indeterminate}
          disabled={props.disabled}
          error={props.error || undefined}
          hint={props.hint || undefined}
        />
      </div>
    )}
    />
  );
}
