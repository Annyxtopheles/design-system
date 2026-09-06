import React, { InputHTMLAttributes, forwardRef, useId, useEffect, useRef } from 'react';
import './Checkbox.scss';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  indeterminate?: boolean;
  error?: string;
  hint?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      indeterminate,
      error,
      hint,
      id,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;
    const errorId = `${checkboxId}-error`;
    const hintId = `${checkboxId}-hint`;
    
    const internalRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const el = (ref && 'current' in ref ? ref.current : internalRef.current);
      if (el) {
        el.indeterminate = !!indeterminate;
      }
    }, [indeterminate, ref]);

    const describedBy = [
      error ? errorId : undefined,
      hint ? hintId : undefined,
    ].filter(Boolean).join(' ') || undefined;

    return (
      <div className={`ds-Checkbox-wrapper ${disabled ? 'ds-Checkbox-wrapper--disabled' : ''} ${className || ''}`}>
        <label className="ds-Checkbox__label-container" htmlFor={checkboxId}>
          <div className={`ds-Checkbox__input-container ${error ? 'ds-Checkbox__input-container--error' : ''}`}>
            <input
              type="checkbox"
              ref={(node) => {
                if (internalRef) (internalRef as any).current = node;
                if (typeof ref === 'function') ref(node);
                else if (ref) (ref as any).current = node;
              }}
              id={checkboxId}
              className="ds-Checkbox__input"
              disabled={disabled}
              aria-invalid={!!error}
              aria-describedby={describedBy}
              {...props}
            />
            <div className="ds-Checkbox__custom" aria-hidden="true">
              {indeterminate ? (
                <svg viewBox="0 0 24 24" className="ds-Checkbox__icon" stroke="currentColor" strokeWidth="3">
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="ds-Checkbox__icon ds-Checkbox__icon--check" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          </div>
          {label && <span className="ds-Checkbox__label-text">{label}</span>}
        </label>
        {error && <div id={errorId} className="ds-Checkbox__error" role="alert">{error}</div>}
        {!error && hint && <div id={hintId} className="ds-Checkbox__hint">{hint}</div>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
