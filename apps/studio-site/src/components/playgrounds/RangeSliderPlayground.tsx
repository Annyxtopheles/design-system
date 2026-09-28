'use client';
import React, { useState } from 'react';
import { RangeSlider } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function RangeSliderPlayground() {
  const [range, setRange] = useState<[number, number]>([250, 750]);

  const defaultProps = {
    label: 'Price Range Filter',
    min: 0,
    max: 1000,
    step: 25,
    disabled: false,
  };

  const controls = [
    { name: 'label', label: 'Slider Label', type: 'text' },
    {
      name: 'step',
      label: 'Step Increment',
      type: 'select',
      options: [
        { label: 'Step: 5', value: 5 },
        { label: 'Step: 25', value: 25 },
        { label: 'Step: 50', value: 50 },
        { label: 'Step: 100', value: 100 },
      ],
    },
    { name: 'disabled', label: 'Disabled State', type: 'toggle' },
  ];

  return (
    <ControlPanel
      componentName="RangeSlider"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
        <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto', padding: '32px 16px' }}>
          <RangeSlider
            label={props.label}
            min={props.min}
            max={props.max}
            step={props.step}
            value={range}
            disabled={props.disabled}
            formatValue={(v) => `$${v}`}
            onChange={(newRange) => setRange(newRange)}
          />
        </div>
      )}
    />
  );
}