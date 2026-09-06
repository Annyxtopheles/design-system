import React, { InputHTMLAttributes, forwardRef, useId } from 'react';
import './Radio.scss';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      id,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const radioId = id || generatedId;

    return (
      <label className={`ds-Radio-wrapper ${disabled ? 'ds-Radio-wrapper--disabled' : ''} ${className || ''}`} htmlFor={radioId}>
        <div className="ds-Radio__input-container">
          <input
            type="radio"
            ref={ref}
            id={radioId}
            className="ds-Radio__input"
            disabled={disabled}
            {...props}
          />
          <div className="ds-Radio__custom" aria-hidden="true">
            <div className="ds-Radio__dot" />
          </div>
        </div>
        {label && <span className="ds-Radio__label-text">{label}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';

export interface RadioGroupProps {
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  label?: string;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  error?: string;
  hint?: string;
  className?: string;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      options,
      value,
      onChange,
      name,
      label,
      disabled,
      orientation = 'vertical',
      error,
      hint,
      className
    },
    ref
  ) => {
    const groupId = useId();
    const errorId = `${groupId}-error`;
    const hintId = `${groupId}-hint`;

    const describedBy = [
      error ? errorId : undefined,
      hint ? hintId : undefined,
    ].filter(Boolean).join(' ') || undefined;

    return (
      <div 
        ref={ref} 
        className={`ds-RadioGroup ds-RadioGroup--${orientation} ${className || ''}`}
        role="radiogroup"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-describedby={describedBy}
        aria-invalid={!!error}
      >
        {label && <div id={`${groupId}-label`} className="ds-RadioGroup__label">{label}</div>}
        <div className="ds-RadioGroup__options">
          {options.map((opt) => (
            <Radio
              key={opt.value}
              name={name}
              value={opt.value}
              label={opt.label}
              disabled={disabled || opt.disabled}
              checked={value === opt.value}
              onChange={() => onChange?.(opt.value)}
            />
          ))}
        </div>
        {error && <div id={errorId} className="ds-RadioGroup__error" role="alert">{error}</div>}
        {!error && hint && <div id={hintId} className="ds-RadioGroup__hint">{hint}</div>}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export default Radio;
