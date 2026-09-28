'use client';
import React, { useState } from 'react';
import { SidebarNav } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function SidebarNavPlayground() {
  const [activeItem, setActiveItem] = useState('overview');

  const defaultProps = {
    collapsed: false,
    collapsible: true,
  };

  const controls = [
    { name: 'collapsed', label: 'Collapsed Icon Rail Mode', type: 'toggle' },
    { name: 'collapsible', label: 'Collapsible Enabled', type: 'toggle' },
  ];

  const items = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: '📈',
      badge: 'New',
      children: [
        { id: 'realtime', label: 'Realtime Traffic' },
        { id: 'conversions', label: 'Conversions' },
      ],
    },
    { id: 'components', label: 'UI Components', icon: '🧩', badge: '35' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <ControlPanel
      componentName="SidebarNav"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
        <div style={{ width: '100%', maxWidth: '320px', margin: '0 auto', border: '1px solid var(--color-border-default)', borderRadius: '12px', overflow: 'hidden' }}>
          <SidebarNav
            items={items}
            activeItem={activeItem}
            collapsed={props.collapsed}
            collapsible={props.collapsible}
            header={<div style={{ padding: '16px', fontWeight: 'bold' }}>Workspace Nav</div>}
            onItemClick={(id) => setActiveItem(id)}
          />
        </div>
      )}
    />
  );
}