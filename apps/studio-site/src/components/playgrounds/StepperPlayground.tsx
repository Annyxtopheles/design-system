'use client';
import React, { useState } from 'react';
import { Stepper } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function StepperPlayground() {
  const [currentStep, setCurrentStep] = useState(1);

  const defaultProps = {
    orientation: 'horizontal',
    variant: 'numbered',
    allowClickBack: true,
  };

  const controls = [
    {
      name: 'orientation',
      label: 'Orientation',
      type: 'select',
      options: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
      ],
    },
    {
      name: 'variant',
      label: 'Variant',
      type: 'select',
      options: [
        { label: 'Numbered', value: 'numbered' },
        { label: 'Default Dots', value: 'default' },
      ],
    },
    { name: 'allowClickBack', label: 'Allow Click Back', type: 'toggle' },
  ];

  const steps = [
    { id: '1', label: 'Account Info', description: 'Enter credentials' },
    { id: '2', label: 'Profile Details', description: 'Personal info' },
    { id: '3', label: 'Preferences', description: 'Notification settings', optional: true },
    { id: '4', label: 'Review & Finish', description: 'Confirm choices' },
  ];

  return (
    <ControlPanel
      componentName="Stepper"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', width: '100%' }}>
          <Stepper
            steps={steps}
            currentStep={currentStep}
            onStepClick={(step) => setCurrentStep(step)}
            orientation={props.orientation}
            variant={props.variant}
            allowClickBack={props.allowClickBack}
          />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '12px' }}>
            <button
              type="button"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep((c) => Math.max(0, c - 1))}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid var(--color-border-default)',
                background: 'var(--color-background-base)',
                cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                opacity: currentStep === 0 ? 0.5 : 1,
              }}
            >
              Previous Step
            </button>
            <button
              type="button"
              disabled={currentStep === steps.length - 1}
              onClick={() => setCurrentStep((c) => Math.min(steps.length - 1, c + 1))}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                background: 'var(--color-interactive-primary)',
                color: '#fff',
                cursor: currentStep === steps.length - 1 ? 'not-allowed' : 'pointer',
                opacity: currentStep === steps.length - 1 ? 0.5 : 1,
              }}
            >
              Next Step
            </button>
          </div>
        </div>
      )}
    />
  );
}