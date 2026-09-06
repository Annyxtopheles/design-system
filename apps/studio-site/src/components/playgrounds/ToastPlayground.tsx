'use client';
import React from 'react';
import { Toast } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function ToastPlayground() {
  const defaultProps = {
      title: 'Changes Synchronized',
      message: 'Branch configuration saved and deployed to edge regions.',
      variant: 'success',
      dismissible: true
    };
  const controls = [
      { name: 'title', label: 'Toast Title', type: 'text' },
      { name: 'message', label: 'Message Body', type: 'text' },
      { name: 'variant', label: 'Variant', type: 'select', options: [
        { label: 'Success', value: 'success' },
        { label: 'Error', value: 'error' },
        { label: 'Warning', value: 'warning' },
        { label: 'Info', value: 'info' }
      ]},
      { name: 'dismissible', label: 'Dismissible', type: 'toggle' }
    ];

  return (
    <ControlPanel
      componentName="Toast"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
      <div style={{ maxWidth: '420px', width: '100%', margin: '0 auto' }}>
        <Toast
          id="toast-demo"
          title={props.title}
          message={props.message}
          variant={props.variant}
          dismissible={props.dismissible}
        />
      </div>
    )}
    />
  );
}
