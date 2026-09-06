'use client';
import React from 'react';
import { Select } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function SelectPlayground() {
  const defaultProps = {
      label: 'Billing Country',
      disabled: false,
      required: true,
      error: '',
      hint: 'Select your country of primary tax residency.',
      placeholder: 'Select a region...'
    };
  const controls = [
      { name: 'label', label: 'Label', type: 'text' },
      { name: 'disabled', label: 'Disabled', type: 'toggle' },
      { name: 'required', label: 'Required', type: 'toggle' },
      { name: 'error', label: 'Error', type: 'text' },
      { name: 'hint', label: 'Hint', type: 'text' },
      { name: 'placeholder', label: 'Placeholder Option', type: 'text' }
    ];

  return (
    <ControlPanel
      componentName="Select"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
      <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
        <Select
          label={props.label}
          disabled={props.disabled}
          required={props.required}
          error={props.error || undefined}
          hint={props.hint || undefined}
          placeholder={props.placeholder}
          options={[
            { label: 'United States', value: 'US' },
            { label: 'United Kingdom', value: 'GB' },
            { label: 'Germany', value: 'DE' },
            { label: 'Japan', value: 'JP' },
            { label: 'Canada', value: 'CA' }
          ]}
        />
      </div>
    )}
    />
  );
}
