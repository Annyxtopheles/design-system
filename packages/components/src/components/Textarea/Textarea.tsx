import React, { TextareaHTMLAttributes, forwardRef, useId } from 'react';
import './Textarea.scss';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Hint message */
  hint?: string;
  /** Whether to show character count */
  showCharCount?: boolean;
  /** Resize behavior */
  resize?: 'none' | 'vertical' | 'both';
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      showCharCount,
      maxLength,
      value,
      defaultValue,
      id,
      required,
      className,
      resize = 'vertical',
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const errorId = `${textareaId}-error`;
    const hintId = `${textareaId}-hint`;

    const describedBy = [
      error ? errorId : undefined,
      hint ? hintId : undefined,
    ].filter(Boolean).join(' ') || undefined;

    const charCount = typeof value === 'string' ? value.length : (typeof defaultValue === 'string' ? defaultValue.length : 0);

    return (
      <div className={`ds-Textarea-wrapper ${className || ''}`}>
        {label && (
          <label htmlFor={textareaId} className="ds-Textarea__label">
            {label}
            {required && <span className="ds-Textarea__required" aria-hidden="true">*</span>}
          </label>
        )}
        <div className={`ds-Textarea__container ${disabled ? 'ds-Textarea__container--disabled' : ''} ${error ? 'ds-Textarea__container--error' : ''}`}>
          <textarea
            ref={ref}
            id={textareaId}
            className={`ds-Textarea__field ds-Textarea__field--resize-${resize}`}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            value={value}
            defaultValue={defaultValue}
            {...props}
          />
        </div>
        <div className="ds-Textarea__footer">
          <div className="ds-Textarea__messages">
            {error && <div id={errorId} className="ds-Textarea__error" role="alert">{error}</div>}
            {!error && hint && <div id={hintId} className="ds-Textarea__hint">{hint}</div>}
          </div>
          {showCharCount && maxLength && (
            <div className="ds-Textarea__char-count" aria-live="polite">
              {charCount} / {maxLength}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
