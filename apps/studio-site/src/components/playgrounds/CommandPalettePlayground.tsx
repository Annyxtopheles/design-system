'use client';
import React, { useState } from 'react';
import { CommandPalette, Button } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function CommandPalettePlayground() {
  const [open, setOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState('None');

  const defaultProps = {
    placeholder: 'Type a command or search...',
    emptyMessage: 'No commands matching query',
  };

  const controls = [
    { name: 'placeholder', label: 'Input Placeholder', type: 'text' },
    { name: 'emptyMessage', label: 'Empty Results Text', type: 'text' },
  ];

  const items = [
    {
      id: 'theme-light',
      label: 'Switch to Light Theme',
      description: 'Set default light color palette',
      group: 'Themes',
      shortcut: '⌘1',
      onSelect: () => {
        setSelectedAction('Theme: Light');
        setOpen(false);
      },
    },
    {
      id: 'theme-dark',
      label: 'Switch to Dark Theme',
      description: 'Set dark obsidian theme',
      group: 'Themes',
      shortcut: '⌘2',
      onSelect: () => {
        setSelectedAction('Theme: Dark');
        setOpen(false);
      },
    },
    {
      id: 'goto-components',
      label: 'Go to Component Library',
      description: 'Browse 35 modular UI components',
      group: 'Navigation',
      shortcut: 'G C',
      onSelect: () => {
        setSelectedAction('Navigate: Components');
        setOpen(false);
      },
    },
    {
      id: 'goto-tokens',
      label: 'Go to Token Foundations',
      description: 'Inspect colors, typography, spacing, elevation',
      group: 'Navigation',
      shortcut: 'G T',
      onSelect: () => {
        setSelectedAction('Navigate: Tokens');
        setOpen(false);
      },
    },
    {
      id: 'docs-export',
      label: 'Export Design Tokens to JSON',
      description: 'Download compiled token manifest',
      group: 'Actions',
      shortcut: '⌘E',
      onSelect: () => {
        setSelectedAction('Export Tokens');
        setOpen(false);
      },
    },
  ];

  return (
    <ControlPanel
      componentName="CommandPalette"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '32px' }}>
          <Button variant="primary" onClick={() => setOpen(true)}>
            Open Command Palette (⌘K)
          </Button>

          <CommandPalette
            open={open}
            onClose={() => setOpen(false)}
            items={items}
            placeholder={props.placeholder}
            emptyMessage={props.emptyMessage}
          />

          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            Executed action: <strong>{selectedAction}</strong>
          </div>
        </div>
      )}
    />
  );
}