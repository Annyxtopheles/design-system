'use client';
import React from 'react';
import { Tooltip } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function TooltipPlayground() {
  const defaultProps = {
      content: 'Copy API authorization credentials to clipboard',
      placement: 'top',
      delay: 200,
      disabled: false
    };
  const controls = [
      { name: 'content', label: 'Tooltip Content', type: 'text' },
      { name: 'placement', label: 'Placement', type: 'select', options: [
        { label: 'Top', value: 'top' },
        { label: 'Bottom', value: 'bottom' },
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' }
      ]},
      { name: 'delay', label: 'Delay in ms (Slider)', type: 'slider', min: 0, max: 1000, step: 50 },
      { name: 'disabled', label: 'Disabled', type: 'toggle' }
    ];

  return (
    <ControlPanel
      componentName="Tooltip"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '120px' }}>
        <Tooltip
          content={props.content}
          placement={props.placement}
          delay={props.delay}
          disabled={props.disabled}
        >
          <button style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #ccc', background: '#f9f9f9', cursor: 'pointer' }}>
            Hover or Focus Me
          </button>
        </Tooltip>
      </div>
    )}
    />
  );
}
