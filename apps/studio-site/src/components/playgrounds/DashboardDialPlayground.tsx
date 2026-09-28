'use client';
import React, { useState } from 'react';
import { DashboardDial } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function DashboardDialPlayground() {
  const [currentVal, setCurrentVal] = useState(72);

  const defaultProps = {
    min: 0,
    max: 100,
    size: 'lg',
    label: 'CPU Utilization',
    unit: '%',
    showMinMax: true,
  };

  const controls = [
    { name: 'label', label: 'Dial Label', type: 'text' },
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
    { name: 'unit', label: 'Unit Suffix', type: 'text' },
    { name: 'showMinMax', label: 'Show Min/Max Markers', type: 'toggle' },
  ];

  return (
    <ControlPanel
      componentName="DashboardDial"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '32px' }}>
          <DashboardDial
            value={currentVal}
            min={props.min}
            max={props.max}
            size={props.size}
            label={props.label}
            unit={props.unit}
            showMinMax={props.showMinMax}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.875rem' }}>Adjust Value:</span>
            <input
              type="range"
              min={props.min}
              max={props.max}
              value={currentVal}
              onChange={(e) => setCurrentVal(Number(e.target.value))}
              style={{ width: '200px' }}
            />
            <span style={{ fontWeight: 'bold' }}>{currentVal}%</span>
          </div>
        </div>
      )}
    />
  );
}