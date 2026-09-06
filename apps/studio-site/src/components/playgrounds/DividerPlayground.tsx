'use client';
import React from 'react';
import { Divider } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function DividerPlayground() {
  const defaultProps = {
      orientation: 'horizontal',
      variant: 'solid',
      spacing: 'md',
      label: 'OR CONTINUE WITH'
    };
  const controls = [
      { name: 'orientation', label: 'Orientation', type: 'select', options: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' }
      ]},
      { name: 'variant', label: 'Line Style', type: 'select', options: [
        { label: 'Solid', value: 'solid' },
        { label: 'Dashed', value: 'dashed' },
        { label: 'Dotted', value: 'dotted' }
      ]},
      { name: 'spacing', label: 'Spacing Rhythm', type: 'select', options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' }
      ]},
      { name: 'label', label: 'Center Label Text', type: 'text' }
    ];

  return (
    <ControlPanel
      componentName="Divider"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
      <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ margin: '0 0 8px', fontSize: '0.9rem', color: '#666' }}>Email & Password Authentication</p>
        <Divider
          orientation={props.orientation}
          variant={props.variant}
          spacing={props.spacing}
          label={props.label || undefined}
        />
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem', color: '#666' }}>Single Sign-On (SSO / SAML)</p>
      </div>
    )}
    />
  );
}
