import React, { useRef } from 'react';
import './DatePicker.scss';

export interface DatePickerProps {
  value?: Date | string | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date | string;
  maxDate?: Date | string;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  clearable?: boolean;
  id?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  placeholder = 'Select date...',
  label,
  error,
  helperText,
  size = 'md',
  clearable = true,
  id,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = id || (label ? `datepicker-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const formattedValue = React.useMemo(() => {
    if (!value) return '';
    if (value instanceof Date) {
      return value.toISOString().split('T')[0];
    }
    return String(value);
  }, [value]);

  const minFormatted = minDate instanceof Date ? minDate.toISOString().split('T')[0] : minDate;
  const maxFormatted = maxDate instanceof Date ? maxDate.toISOString().split('T')[0] : maxDate;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) {
      onChange?.(null);
    } else {
      onChange?.(new Date(val));
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={`ds-DatePicker ds-DatePicker--${size} ${error ? 'ds-DatePicker--error' : ''} ${disabled ? 'ds-DatePicker--disabled' : ''}`}>
      {label && (
        <label htmlFor={inputId} className="ds-DatePicker__label">
          {label}
        </label>
      )}

      <div className="ds-DatePicker__input-wrapper">
        <span className="ds-DatePicker__icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </span>

        <input
          ref={inputRef}
          id={inputId}
          type="date"
          disabled={disabled}
          placeholder={placeholder}
          value={formattedValue}
          onChange={handleChange}
          min={minFormatted}
          max={maxFormatted}
          className="ds-DatePicker__input"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error || helperText ? `${inputId}-desc` : undefined}
        />

        {clearable && formattedValue && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="ds-DatePicker__clear-btn"
            aria-label="Clear date selection"
          >
            &times;
          </button>
        )}
      </div>

      {(error || helperText) && (
        <div id={`${inputId}-desc`} className={`ds-DatePicker__helper ${error ? 'ds-DatePicker__helper--error' : ''}`}>
          {error || helperText}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
