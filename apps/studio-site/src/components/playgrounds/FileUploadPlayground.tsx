'use client';
import React from 'react';
import { FileUpload } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function FileUploadPlayground() {
  const defaultProps = {
    accept: 'image/*,.pdf,.svg',
    multiple: true,
    disabled: false,
    maxFiles: 5,
  };

  const controls = [
    { name: 'accept', label: 'Accepted Formats', type: 'text' },
    {
      name: 'maxFiles',
      label: 'Max Files Limit',
      type: 'select',
      options: [
        { label: '1 File', value: 1 },
        { label: '3 Files', value: 3 },
        { label: '5 Files', value: 5 },
        { label: '10 Files', value: 10 },
      ],
    },
    { name: 'multiple', label: 'Allow Multiple', type: 'toggle' },
    { name: 'disabled', label: 'Disabled State', type: 'toggle' },
  ];

  return (
    <ControlPanel
      componentName="FileUpload"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
        <div style={{ width: '100%', maxWidth: '520px', margin: '0 auto', padding: '16px' }}>
          <FileUpload
            accept={props.accept}
            maxFiles={props.maxFiles}
            multiple={props.multiple}
            disabled={props.disabled}
          />
        </div>
      )}
    />
  );
}