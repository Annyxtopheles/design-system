import React from 'react';
import './Divider.scss';

export interface DividerProps {
  /** Orientation of the divider */
  orientation?: 'horizontal' | 'vertical';
  /** Visual variant */
  variant?: 'solid' | 'dashed' | 'dotted';
  /** Optional centered text for horizontal divider */
  label?: React.ReactNode;
  /** Spacing around the divider */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  /** Custom color */
  color?: string;
  /** Additional class names */
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  label,
  spacing = 'md',
  color,
  className = '',
}) => {
  const baseClass = `ds-Divider ds-Divider--${orientation} ds-Divider--variant-${variant} ds-Divider--spacing-${spacing} ${className}`;
  const customStyle = color ? { borderColor: color } : {};

  if (orientation === 'horizontal' && label) {
    return (
      <div className={`ds-Divider-with-label ds-Divider-with-label--spacing-${spacing} ${className}`} role="separator">
        <div className={`ds-Divider-with-label__line ds-Divider--variant-${variant}`} style={customStyle} />
        <div className="ds-Divider-with-label__content">{label}</div>
        <div className={`ds-Divider-with-label__line ds-Divider--variant-${variant}`} style={customStyle} />
      </div>
    );
  }

  return (
    <hr className={baseClass} style={customStyle} role="separator" aria-orientation={orientation} />
  );
};

export default Divider;
