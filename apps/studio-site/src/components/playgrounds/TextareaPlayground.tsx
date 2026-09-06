'use client';
import React from 'react';
import { Textarea } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function TextareaPlayground() {
  const defaultProps = {
      label: 'Feedback & Comments',
      placeholder: 'Enter your detailed notes here...',
      rows: 4,
      maxLength: 250,
      showCharCount: true,
      resize: 'vertical',
      disabled: false,
      error: '',
      hint: 'Include any technical crash codes if applicable.'
    };
  const controls = [
      { name: 'label', label: 'Label', type: 'text' },
      { name: 'placeholder', label: 'Placeholder', type: 'text' },
      { name: 'rows', label: 'Rows (Slider)', type: 'slider', min: 2, max: 12, step: 1 },
      { name: 'maxLength', label: 'Max Length (Slider)', type: 'slider', min: 50, max: 500, step: 25 },
      { name: 'showCharCount', label: 'Show Character Count', type: 'toggle' },
      { name: 'resize', label: 'Resize Mode', type: 'select', options: [
        { label: 'Vertical', value: 'vertical' },
        { label: 'None', value: 'none' },
        { label: 'Both', value: 'both' }
      ]},
      { name: 'disabled', label: 'Disabled', type: 'toggle' },
      { name: 'error', label: 'Error Message', type: 'text' },
      { name: 'hint', label: 'Helper Hint', type: 'text' }
    ];

  return (
    <ControlPanel
      componentName="Textarea"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
      <div style={{ maxWidth: '500px', width: '100%', margin: '0 auto' }}>
        <Textarea
          label={props.label}
          placeholder={props.placeholder}
          rows={props.rows}
          maxLength={props.maxLength}
          showCharCount={props.showCharCount}
          resize={props.resize}
          disabled={props.disabled}
          error={props.error || undefined}
          hint={props.hint || undefined}
        />
      </div>
    )}
    />
  );
}
