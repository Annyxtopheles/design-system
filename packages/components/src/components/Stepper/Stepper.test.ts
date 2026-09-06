import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stepper from './Stepper';

const mockSteps = [
  { id: 'step1', label: 'Step 1', description: 'Desc 1' },
  { id: 'step2', label: 'Step 2', optional: true },
  { id: 'step3', label: 'Step 3' }
];

describe('Stepper Component', () => {
  it('renders without crashing and matches snapshot', () => {
    const { asFragment } = render(<Stepper steps={mockSteps} currentStep={1} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders all steps and text', () => {
    render(<Stepper steps={mockSteps} currentStep={1} />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Desc 1')).toBeInTheDocument();
    expect(screen.getByText('(Optional)')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('indicates active and completed steps', () => {
    render(<Stepper steps={mockSteps} currentStep={1} />);
    const activeStep = screen.getByText('Step 2').closest('li');
    expect(activeStep).toHaveAttribute('aria-current', 'step');
    expect(activeStep).toHaveClass('ds-Stepper__item--active');
    
    const completedStep = screen.getByText('Step 1').closest('li');
    expect(completedStep).toHaveClass('ds-Stepper__item--completed');
  });

  it('allows clicking back to completed steps if enabled', () => {
    const handleClick = jest.fn();
    render(<Stepper steps={mockSteps} currentStep={2} onStepClick={handleClick} />);
    
    // Step 1 is completed
    const step1 = screen.getByText('Step 1').closest('div[role="button"]');
    expect(step1).toBeInTheDocument();
    
    fireEvent.click(step1!);
    expect(handleClick).toHaveBeenCalledWith(0);
  });

  it('prevents clicking upcoming steps', () => {
    const handleClick = jest.fn();
    render(<Stepper steps={mockSteps} currentStep={0} onStepClick={handleClick} />);
    
    const step3 = screen.getByText('Step 3').closest('.ds-Stepper__content');
    fireEvent.click(step3!);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
