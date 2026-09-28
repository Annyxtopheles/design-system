import { type InputHTMLAttributes, type ReactNode, forwardRef, useId } from 'react';
import './Input.scss';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Hint message */
  hint?: string;
  /** Icon/element to show before input */
  prefix?: ReactNode;
  /** Icon/element to show after input */
  suffix?: ReactNode;
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      prefix,
      suffix,
      size = 'md',
      id,
      required,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    const describedBy = [
      error ? errorId : undefined,
      hint ? hintId : undefined,
    ].filter(Boolean).join(' ') || undefined;

    return (
      <div className={`ds-Input-wrapper ds-Input-wrapper--${size} ${className || ''}`}>
        {label && (
          <label htmlFor={inputId} className="ds-Input__label">
            {label}
            {required && <span className="ds-Input__required" aria-hidden="true">*</span>}
          </label>
        )}
        <div className={`ds-Input__container ${disabled ? 'ds-Input__container--disabled' : ''} ${error ? 'ds-Input__container--error' : ''}`}>
          {prefix && <span className="ds-Input__prefix">{prefix}</span>}
          <input
            ref={ref}
            id={inputId}
            className="ds-Input__field"
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            {...props}
          />
          {suffix && <span className="ds-Input__suffix">{suffix}</span>}
        </div>
        {error && <div id={errorId} className="ds-Input__error" role="alert">{error}</div>}
        {!error && hint && <div id={hintId} className="ds-Input__hint">{hint}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
