import React, { HTMLAttributes, ReactNode, forwardRef } from 'react';
import './Badge.scss';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  icon?: ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      dot = false,
      removable = false,
      onRemove,
      icon,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      'ds-Badge',
      `ds-Badge--${variant}`,
      `ds-Badge--${size}`,
      dot ? 'ds-Badge--dot' : '',
      className,
    ].filter(Boolean).join(' ');

    return (
      <span ref={ref} className={classNames} {...props}>
        {icon && <span className="ds-Badge__icon">{icon}</span>}
        {!dot && <span className="ds-Badge__content">{children}</span>}
        {removable && !dot && (
          <button
            type="button"
            className="ds-Badge__remove"
            onClick={onRemove}
            aria-label="Remove"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
export default Badge;
