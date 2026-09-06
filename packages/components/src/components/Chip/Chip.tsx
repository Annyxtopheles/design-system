import React from 'react';
import './Chip.scss';

export interface ChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** Label of the chip */
  label: string;
  /** Visual variant */
  variant?: 'filled' | 'outlined' | 'ghost';
  /** Color theme */
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  /** Size */
  size?: 'sm' | 'md';
  /** Optional icon to display before label */
  icon?: React.ReactNode;
  /** Whether the chip can be removed */
  removable?: boolean;
  /** Callback when remove button is clicked */
  onRemove?: (e: React.MouseEvent) => void;
  /** Whether the chip is selected/active */
  selected?: boolean;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'filled',
  color = 'default',
  size = 'md',
  icon,
  removable = false,
  onRemove,
  selected = false,
  className = '',
  disabled,
  onClick,
  ...rest
}) => {
  const classes = [
    'ds-Chip',
    `ds-Chip--variant-${variant}`,
    `ds-Chip--color-${color}`,
    `ds-Chip--size-${size}`,
    selected ? 'ds-Chip--selected' : '',
    disabled ? 'ds-Chip--disabled' : '',
    onClick ? 'ds-Chip--clickable' : '',
    className
  ].filter(Boolean).join(' ');

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) onRemove(e);
  };

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      {...rest}
    >
      {icon && <span className="ds-Chip__icon">{icon}</span>}
      <span className="ds-Chip__label">{label}</span>
      {removable && (
        <span
          className="ds-Chip__remove"
          onClick={handleRemove}
          role="button"
          aria-label={`Remove ${label}`}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleRemove(e as any);
            }
          }}
        >
          &times;
        </span>
      )}
    </button>
  );
};

export default Chip;
