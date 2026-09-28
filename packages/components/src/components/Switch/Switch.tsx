import { type InputHTMLAttributes, forwardRef, useId, type KeyboardEvent } from 'react';
import './Switch.scss';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  labelPosition?: 'left' | 'right';
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      size = 'md',
      labelPosition = 'right',
      id,
      className,
      disabled,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const switchId = id || generatedId;

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.click();
      }
    };

    const labelElement = label && (
      <span className="ds-Switch__label-text" id={`${switchId}-label`}>
        {label}
      </span>
    );

    return (
      <label 
        className={`ds-Switch-wrapper ds-Switch-wrapper--${size} ${disabled ? 'ds-Switch-wrapper--disabled' : ''} ${className || ''}`}
        htmlFor={switchId}
      >
        {labelPosition === 'left' && labelElement}
        <div className="ds-Switch__input-container">
          <input
            type="checkbox"
            role="switch"
            ref={ref}
            id={switchId}
            className="ds-Switch__input"
            disabled={disabled}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            aria-checked={props.checked}
            aria-labelledby={label ? `${switchId}-label` : undefined}
            {...props}
          />
          <div className="ds-Switch__track" aria-hidden="true">
            <div className="ds-Switch__thumb" />
          </div>
        </div>
        {labelPosition === 'right' && labelElement}
      </label>
    );
  }
);

Switch.displayName = 'Switch';
export default Switch;
