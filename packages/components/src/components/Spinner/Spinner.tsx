import { forwardRef } from 'react';
import './Spinner.scss';

export interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'inherit';
  label?: string;
  overlay?: boolean;
  className?: string;
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = 'md',
      color = 'primary',
      label = 'Loading...',
      overlay = false,
      className,
      ...props
    },
    ref
  ) => {
    const spinnerElement = (
      <div
        ref={ref}
        className={`ds-Spinner ds-Spinner--${size} ds-Spinner--${color} ${className || ''}`}
        role="status"
        aria-label={label}
        {...props}
      >
        <svg
          className="ds-Spinner__svg"
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="ds-Spinner__circle"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
          />
        </svg>
        <span className="ds-Spinner__sr-only">{label}</span>
      </div>
    );

    if (overlay) {
      return (
        <div className="ds-Spinner-overlay">
          {spinnerElement}
        </div>
      );
    }

    return spinnerElement;
  }
);

Spinner.displayName = 'Spinner';
export default Spinner;
