'use client';
import React from 'react';
import { Skeleton } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function SkeletonPlayground() {
  const defaultProps = {
      variant: 'text',
      lines: 4,
      animate: 'shimmer'
    };
  const controls = [
      { name: 'variant', label: 'Shape Variant', type: 'select', options: [
        { label: 'Text Lines', value: 'text' },
        { label: 'Rectangle Card', value: 'rect' },
        { label: 'Circle Avatar', value: 'circle' }
      ]},
      { name: 'lines', label: 'Lines Count (Slider)', type: 'slider', min: 1, max: 8, step: 1 },
      { name: 'animate', label: 'Animation Style', type: 'select', options: [
        { label: 'Shimmer Wave', value: 'shimmer' },
        { label: 'Pulse Opacity', value: 'pulse' },
        { label: 'Static None', value: 'none' }
      ]}
    ];

  return (
    <ControlPanel
      componentName="Skeleton"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
      <div style={{ maxWidth: '450px', width: '100%', margin: '0 auto' }}>
        <Skeleton
          variant={props.variant}
          lines={props.lines}
          animate={props.animate}
        />
      </div>
    )}
    />
  );
}
