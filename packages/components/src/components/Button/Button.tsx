import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';
import './Button.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The variant of the button */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'link';
  /** The size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the button is loading */
  loading?: boolean;
  /** Icon to show on the left */
  leftIcon?: ReactNode;
  /** Icon to show on the right */
  rightIcon?: ReactNode;
  /** Whether the button should take full width */
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      'ds-Button',
      `ds-Button--${variant}`,
      `ds-Button--${size}`,
      fullWidth ? 'ds-Button--fullWidth' : '',
      loading ? 'ds-Button--loading' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <span className="ds-Button__spinner" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="31.4 31.4" />
            </svg>
          </span>
        )}
        {!loading && leftIcon && <span className="ds-Button__icon ds-Button__icon--left">{leftIcon}</span>}
        <span className="ds-Button__content">{children}</span>
        {!loading && rightIcon && <span className="ds-Button__icon ds-Button__icon--right">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
