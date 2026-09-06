'use client';
import React from 'react';
import { Avatar } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function AvatarPlayground() {
  const defaultProps = {
      name: 'Alexander Hamilton',
      size: 'xl',
      shape: 'circle',
      status: 'online'
    };
  const controls = [
      { name: 'name', label: 'Display Name', type: 'text' },
      { name: 'size', label: 'Size', type: 'select', options: [
        { label: 'XS', value: 'xs' },
        { label: 'SM', value: 'sm' },
        { label: 'MD', value: 'md' },
        { label: 'LG', value: 'lg' },
        { label: 'XL', value: 'xl' },
        { label: '2XL', value: '2xl' }
      ]},
      { name: 'shape', label: 'Shape', type: 'select', options: [
        { label: 'Circle', value: 'circle' },
        { label: 'Square', value: 'square' }
      ]},
      { name: 'status', label: 'Status Pip', type: 'select', options: [
        { label: 'None', value: '' },
        { label: 'Online', value: 'online' },
        { label: 'Busy', value: 'busy' },
        { label: 'Away', value: 'away' },
        { label: 'Offline', value: 'offline' }
      ]}
    ];

  return (
    <ControlPanel
      componentName="Avatar"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '120px' }}>
        <Avatar
          name={props.name}
          size={props.size}
          shape={props.shape}
          status={props.status || undefined}
        />
      </div>
    )}
    />
  );
}
