'use client';
import React from 'react';
import { Popover, Button } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function PopoverPlayground() {
  const defaultProps = {
    placement: 'bottom',
    showArrow: true,
    title: 'Popover Details',
  };

  const controls = [
    {
      name: 'placement',
      label: 'Placement',
      type: 'select',
      options: [
        { label: 'Bottom', value: 'bottom' },
        { label: 'Top', value: 'top' },
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    { name: 'showArrow', label: 'Show Arrow Pointer', type: 'toggle' },
    { name: 'title', label: 'Popover Title', type: 'text' },
  ];

  return (
    <ControlPanel
      componentName="Popover"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '220px', padding: '32px' }}>
          <Popover
            placement={props.placement}
            showArrow={props.showArrow}
            title={props.title}
            trigger={<Button variant="secondary">Click for Popover</Button>}
            content={
              <div style={{ padding: '8px 4px', maxWidth: '240px' }}>
                <p style={{ margin: '0 0 8px', fontSize: '0.875rem' }}>
                  Rich interactive overlays for contextual options, mini-forms, or user bios.
                </p>
                <Button size="sm" variant="primary">
                  Got it
                </Button>
              </div>
            }
          />
        </div>
      )}
    />
  );
}