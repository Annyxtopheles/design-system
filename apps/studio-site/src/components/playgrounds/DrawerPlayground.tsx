'use client';
import React, { useState } from 'react';
import { Drawer, Button } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function DrawerPlayground() {
  const [open, setOpen] = useState(false);

  const defaultProps = {
    placement: 'right',
    size: 'md',
    title: 'Slide-out Drawer',
  };

  const controls = [
    {
      name: 'placement',
      label: 'Placement',
      type: 'select',
      options: [
        { label: 'Right', value: 'right' },
        { label: 'Left', value: 'left' },
        { label: 'Top', value: 'top' },
        { label: 'Bottom', value: 'bottom' },
      ],
    },
    {
      name: 'size',
      label: 'Size',
      type: 'select',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Full Viewport', value: 'full' },
      ],
    },
    { name: 'title', label: 'Drawer Title', type: 'text' },
  ];

  return (
    <ControlPanel
      componentName="Drawer"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px' }}>
          <Button variant="primary" onClick={() => setOpen(true)}>
            Open Drawer ({props.placement})
          </Button>

          <Drawer
            open={open}
            onClose={() => setOpen(false)}
            placement={props.placement}
            size={props.size}
            title={props.title}
            footer={
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setOpen(false)}>
                  Confirm Action
                </Button>
              </div>
            }
          >
            <p>This is the content inside the slide-out drawer panel.</p>
            <p>It supports focus traps, backdrop blur, Escape key dismiss, and multiple sizes.</p>
          </Drawer>
        </div>
      )}
    />
  );
}