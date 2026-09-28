'use client';
import React, { useState } from 'react';
import { DatePicker } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function DatePickerPlayground() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const defaultProps = {
    label: 'Deployment Date',
    size: 'md',
    disabled: false,
    clearable: true,
    error: '',
    helperText: 'Select a target launch date',
  };

  const controls = [
    { name: 'label', label: 'Field Label', type: 'text' },
    {
      name: 'size',
      label: 'Size',
      type: 'select',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
    },
    { name: 'helperText', label: 'Helper Text', type: 'text' },
    { name: 'error', label: 'Error Message', type: 'text' },
    { name: 'clearable', label: 'Clear Button', type: 'toggle' },
    { name: 'disabled', label: 'Disabled State', type: 'toggle' },
  ];

  return (
    <ControlPanel
      componentName="DatePicker"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '32px' }}>
          <DatePicker
            label={props.label}
            size={props.size}
            disabled={props.disabled}
            clearable={props.clearable}
            error={props.error}
            helperText={props.helperText}
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
            Selected Date: <strong>{selectedDate ? selectedDate.toLocaleDateString() : 'None'}</strong>
          </div>
        </div>
      )}
    />
  );
}