'use client';
import React from 'react';
import { Input } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function InputPlayground() {
  const defaultProps = {
      label: 'Email Address',
      placeholder: 'user@domain.com',
      type: 'email',
      size: 'md',
      error: '',
      hint: 'We will never share your email with third parties.',
      disabled: false,
      required: true,
      readOnly: false
    };
  const controls = [
      { name: 'label', label: 'Label', type: 'text' },
      { name: 'placeholder', label: 'Placeholder', type: 'text' },
      { name: 'type', label: 'Input Type', type: 'select', options: [
        { label: 'Text', value: 'text' },
        { label: 'Email', value: 'email' },
        { label: 'Password', value: 'password' },
        { label: 'Number', value: 'number' }
      ]},
      { name: 'size', label: 'Size', type: 'select', options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' }
      ]},
      { name: 'error', label: 'Error Message', type: 'text' },
      { name: 'hint', label: 'Hint Message', type: 'text' },
      { name: 'disabled', label: 'Disabled', type: 'toggle' },
      { name: 'required', label: 'Required', type: 'toggle' },
      { name: 'readOnly', label: 'Read Only', type: 'toggle' }
    ];

  return (
    <ControlPanel
      componentName="Input"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
      <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
        <Input
          label={props.label}
          placeholder={props.placeholder}
          type={props.type}
          size={props.size}
          error={props.error || undefined}
          hint={props.hint || undefined}
          disabled={props.disabled}
          required={props.required}
          readOnly={props.readOnly}
        />
      </div>
    )}
    />
  );
}
