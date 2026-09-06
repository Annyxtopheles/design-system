import React, { SelectHTMLAttributes, forwardRef, useId } from 'react';
import './Select.scss';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  options: SelectOption[];
  error?: string;
  hint?: string;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      error,
      hint,
      id,
      required,
      className,
      disabled,
      placeholder,
      multiple,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const errorId = `${selectId}-error`;
    const hintId = `${selectId}-hint`;

    const describedBy = [
      error ? errorId : undefined,
      hint ? hintId : undefined,
    ].filter(Boolean).join(' ') || undefined;

    return (
      <div className={`ds-Select-wrapper ${className || ''}`}>
        {label && (
          <label htmlFor={selectId} className="ds-Select__label">
            {label}
            {required && <span className="ds-Select__required" aria-hidden="true">*</span>}
          </label>
        )}
        <div className={`ds-Select__container ${disabled ? 'ds-Select__container--disabled' : ''} ${error ? 'ds-Select__container--error' : ''}`}>
          <select
            ref={ref}
            id={selectId}
            className="ds-Select__field"
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            multiple={multiple}
            {...props}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          {!multiple && (
            <span className="ds-Select__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          )}
        </div>
        {error && <div id={errorId} className="ds-Select__error" role="alert">{error}</div>}
        {!error && hint && <div id={hintId} className="ds-Select__hint">{hint}</div>}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
