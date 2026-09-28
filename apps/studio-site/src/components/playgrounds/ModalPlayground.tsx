'use client';
import React, { useState } from 'react';
import { Modal, Button } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function ModalPlayground() {
  const [open, setOpen] = useState(false);

  const defaultProps = {
    size: 'md',
    title: 'Confirm Deletion',
    hideCloseButton: false,
  };

  const controls = [
    {
      name: 'size',
      label: 'Size',
      type: 'select',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
    },
    { name: 'title', label: 'Modal Title', type: 'text' },
    { name: 'hideCloseButton', label: 'Hide Close Button', type: 'toggle' },
  ];

  return (
    <ControlPanel
      componentName="Modal"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px' }}>
          <Button variant="primary" onClick={() => setOpen(true)}>
            Open Dialog Modal
          </Button>

          <Modal
            open={open}
            onClose={() => setOpen(false)}
            size={props.size}
            title={props.title}
            hideCloseButton={props.hideCloseButton}
          >
            <p>
              Are you sure you want to proceed with this operation? This dialog traps focus, locks body scroll,
              and complies with WCAG 2.2 Level AAA dialog criteria.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '24px' }}>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => setOpen(false)}>
                Delete Permanently
              </Button>
            </div>
          </Modal>
        </div>
      )}
    />
  );
}