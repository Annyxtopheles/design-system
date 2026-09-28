'use client';
import React, { useState } from 'react';
import { DropdownMenu, Button } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function DropdownMenuPlayground() {
  const [lastAction, setLastAction] = useState<string>('None');

  const defaultProps = {
    placement: 'bottom-start',
    closeOnSelect: true,
  };

  const controls = [
    {
      name: 'placement',
      label: 'Placement',
      type: 'select',
      options: [
        { label: 'Bottom Start', value: 'bottom-start' },
        { label: 'Bottom End', value: 'bottom-end' },
        { label: 'Top Start', value: 'top-start' },
      ],
    },
    { name: 'closeOnSelect', label: 'Close On Select', type: 'toggle' },
  ];

  const menuItems = [
    { id: 'edit', label: 'Edit Document', shortcut: '⌘E', onClick: () => setLastAction('Edit Document') },
    { id: 'duplicate', label: 'Duplicate', shortcut: '⌘D', onClick: () => setLastAction('Duplicate') },
    { id: 'share', label: 'Share Link', onClick: () => setLastAction('Share Link') },
    { id: 'sep-1', label: '', separator: true },
    { id: 'archive', label: 'Archive Project', onClick: () => setLastAction('Archive') },
    { id: 'delete', label: 'Delete Forever', onClick: () => setLastAction('Delete'), disabled: false },
  ];

  return (
    <ControlPanel
      componentName="DropdownMenu"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', minHeight: '260px', padding: '32px' }}>
          <DropdownMenu
            trigger={<Button variant="primary">Actions Menu ▾</Button>}
            items={menuItems}
            placement={props.placement}
            closeOnSelect={props.closeOnSelect}
          />
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '80px' }}>
            Last triggered action: <strong>{lastAction}</strong>
          </div>
        </div>
      )}
    />
  );
}