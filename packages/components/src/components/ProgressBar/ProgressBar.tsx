import React from 'react';
import './ProgressBar.scss';

export interface ProgressBarProps {
  /** Current value (0-max) */
  value?: number;
  /** Maximum value */
  max?: number;
  /** Progress variant */
  variant?: 'linear' | 'circular';
  /** Color theme */
  color?: 'primary' | 'success' | 'warning' | 'error';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Label for screen readers */
  label?: string;
  /** Whether to visually show the percentage value */
  showValue?: boolean;
  /** Whether it is indeterminate */
  indeterminate?: boolean;
  /** Animated stripes for linear */
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value = 0,
  max = 100,
  variant = 'linear',
  color = 'primary',
  size = 'md',
  label = 'Progress',
  showValue = false,
  indeterminate = false,
  animated = false,
}) => {
  const boundedValue = Math.min(Math.max(value, 0), max);
  const percentage = indeterminate ? 0 : Math.round((boundedValue / max) * 100);

  if (variant === 'circular') {
    const strokeWidth = size === 'sm' ? 4 : size === 'lg' ? 8 : 6;
    const radius = size === 'sm' ? 16 : size === 'lg' ? 32 : 24;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = indeterminate ? 0 : circumference - (percentage / 100) * circumference;

    return (
      <div 
        className={`ds-ProgressBar-circular ds-ProgressBar--color-${color} ds-ProgressBar--size-${size} ${indeterminate ? 'ds-ProgressBar--indeterminate' : ''}`}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : boundedValue}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <svg viewBox={`0 0 ${radius * 2 + strokeWidth * 2} ${radius * 2 + strokeWidth * 2}`}>
          <circle
            className="ds-ProgressBar-circular__bg"
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            className="ds-ProgressBar-circular__fill"
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        {showValue && !indeterminate && (
          <div className="ds-ProgressBar-circular__value">{percentage}%</div>
        )}
      </div>
    );
  }

  return (
    <div 
      className={`ds-ProgressBar-linear ds-ProgressBar--color-${color} ds-ProgressBar--size-${size} ${indeterminate ? 'ds-ProgressBar--indeterminate' : ''} ${animated ? 'ds-ProgressBar--animated' : ''}`}
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : boundedValue}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
    >
      <div className="ds-ProgressBar-linear__wrapper">
        <div 
          className="ds-ProgressBar-linear__fill" 
          style={{ width: indeterminate ? '100%' : `${percentage}%` }}
        />
      </div>
      {showValue && !indeterminate && (
        <div className="ds-ProgressBar-linear__value">{percentage}%</div>
      )}
    </div>
  );
};

export default ProgressBar;
