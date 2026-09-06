'use client';
import React from 'react';
import { Chip } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function ChipPlayground() {
  const defaultProps = {
      label: 'TypeScript 5.5',
      variant: 'filled',
      color: 'primary',
      selected: true,
      removable: true,
      disabled: false
    };
  const controls = [
      { name: 'label', label: 'Chip Label', type: 'text' },
      { name: 'variant', label: 'Visual Variant', type: 'select', options: [
        { label: 'Filled', value: 'filled' },
        { label: 'Outlined', value: 'outlined' },
        { label: 'Ghost', value: 'ghost' }
      ]},
      { name: 'color', label: 'Semantic Palette', type: 'select', options: [
        { label: 'Default', value: 'default' },
        { label: 'Primary', value: 'primary' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' }
      ]},
      { name: 'selected', label: 'Selected State', type: 'toggle' },
      { name: 'removable', label: 'Removable (Dismissible)', type: 'toggle' },
      { name: 'disabled', label: 'Disabled', type: 'toggle' }
    ];

  return (
    <ControlPanel
      componentName="Chip"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60px' }}>
        <Chip
          label={props.label}
          variant={props.variant}
          color={props.color}
          selected={props.selected}
          removable={props.removable}
          disabled={props.disabled}
        />
      </div>
    )}
    />
  );
}
