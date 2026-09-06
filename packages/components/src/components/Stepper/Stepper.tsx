import React from 'react';
import './Stepper.scss';

export interface Step {
  id: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  optional?: boolean;
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'numbered' | 'icon';
  allowClickBack?: boolean;
  'aria-label'?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  orientation = 'horizontal',
  variant = 'numbered',
  allowClickBack = true,
  'aria-label': ariaLabel = 'Progress stepper'
}) => {
  return (
    <nav aria-label={ariaLabel} className={`ds-Stepper ds-Stepper--${orientation} ds-Stepper--${variant}`}>
      <ol className="ds-Stepper__list">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isUpcoming = index > currentStep;
          const isClickable = allowClickBack && isCompleted && onStepClick;

          let stateClass = 'ds-Stepper__item--upcoming';
          if (isCompleted) stateClass = 'ds-Stepper__item--completed';
          if (isActive) stateClass = 'ds-Stepper__item--active';

          return (
            <li 
              key={step.id} 
              className={`ds-Stepper__item ${stateClass}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <div 
                className={`ds-Stepper__content ${isClickable ? 'ds-Stepper__content--clickable' : ''}`}
                onClick={() => isClickable && onStepClick?.(index)}
                role={isClickable ? 'button' : undefined}
                tabIndex={isClickable ? 0 : undefined}
                onKeyDown={(e) => {
                  if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onStepClick?.(index);
                  }
                }}
              >
                <div className="ds-Stepper__indicator">
                  {variant === 'numbered' && (
                    <span className="ds-Stepper__number">
                      {isCompleted ? '✓' : index + 1}
                    </span>
                  )}
                  {variant === 'default' && <span className="ds-Stepper__dot" />}
                </div>
                
                <div className="ds-Stepper__text">
                  <div className="ds-Stepper__label">
                    {step.label}
                    {step.optional && <span className="ds-Stepper__optional">(Optional)</span>}
                  </div>
                  {step.description && (
                    <div className="ds-Stepper__description">{step.description}</div>
                  )}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="ds-Stepper__connector" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Stepper;
