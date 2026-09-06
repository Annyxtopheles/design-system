import React from 'react';
import './Skeleton.scss';

export interface SkeletonProps {
  /** Visual variant of the skeleton */
  variant?: 'text' | 'rect' | 'circle' | 'card';
  /** Width of the skeleton */
  width?: string | number;
  /** Height of the skeleton */
  height?: string | number;
  /** Number of lines for text variant */
  lines?: number;
  /** Animation style */
  animate?: 'shimmer' | 'pulse' | 'none';
  /** Additional class names */
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> & {
  Text: React.FC<Omit<SkeletonProps, 'variant'>>;
  Rect: React.FC<Omit<SkeletonProps, 'variant'>>;
  Circle: React.FC<Omit<SkeletonProps, 'variant'>>;
  Card: React.FC<Omit<SkeletonProps, 'variant'>>;
} = ({
  variant = 'text',
  width,
  height,
  lines = 1,
  animate = 'shimmer',
  className = '',
}) => {
  const baseClass = `ds-Skeleton ds-Skeleton--${variant} ds-Skeleton--animate-${animate} ${className}`;
  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="ds-Skeleton-group" aria-busy="true" aria-label="Loading content">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={baseClass}
            style={{
              ...style,
              width: i === lines - 1 && !width ? '80%' : width,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`ds-Skeleton-card ${className}`} style={style} aria-busy="true" aria-label="Loading content">
        <Skeleton variant="rect" height={150} animate={animate} />
        <div className="ds-Skeleton-card__content">
          <Skeleton variant="text" animate={animate} className="ds-Skeleton-card__title" />
          <Skeleton variant="text" lines={2} animate={animate} />
        </div>
      </div>
    );
  }

  return <div className={baseClass} style={style} aria-busy="true" aria-label="Loading content" />;
};

Skeleton.Text = (props) => <Skeleton variant="text" {...props} />;
Skeleton.Rect = (props) => <Skeleton variant="rect" {...props} />;
Skeleton.Circle = (props) => <Skeleton variant="circle" {...props} />;
Skeleton.Card = (props) => <Skeleton variant="card" {...props} />;

export default Skeleton;
