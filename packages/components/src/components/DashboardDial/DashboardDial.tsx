import React, { useState, useEffect } from 'react';
import './DashboardDial.scss';

export interface DashboardDialProps {
  value: number;
  min: number;
  max: number;
  label?: string;
  unit?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'success' | 'warning' | 'error' | string;
  showValue?: boolean;
  showMinMax?: boolean;
  animationDuration?: number;
  thresholds?: Array<{ value: number; color: string }>;
  segments?: number;
}

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
};

const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return [
    'M', start.x, start.y, 
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ');
};

export const DashboardDial: React.FC<DashboardDialProps> = ({
  value,
  min,
  max,
  label,
  unit = '',
  size = 'md',
  color = 'primary',
  showValue = true,
  showMinMax = false,
  animationDuration = 1000,
  thresholds,
  segments
}) => {
  const [animatedValue, setAnimatedValue] = useState(min);

  useEffect(() => {
    let startTimestamp: number;
    const startValue = animatedValue;
    const clampedTarget = Math.min(Math.max(value, min), max);
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / animationDuration, 1);
      
      const currentVal = startValue + (clampedTarget - startValue) * progress;
      setAnimatedValue(currentVal);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  }, [value, min, max, animationDuration]);

  const percentage = (animatedValue - min) / (max - min);
  const startAngle = -135;
  const sweepAngle = 270;
  const endAngle = startAngle + sweepAngle * percentage;
  
  const cx = 100;
  const cy = 100;
  const radius = 80;

  const bgPath = describeArc(cx, cy, radius, -135, 135);
  const fgPath = describeArc(cx, cy, radius, -135, Math.max(-135, endAngle));

  const getCurrentColor = () => {
    if (thresholds && thresholds.length > 0) {
      const sorted = [...thresholds].sort((a, b) => b.value - a.value);
      const match = sorted.find(t => value >= t.value);
      return match ? match.color : color;
    }
    return `var(--color-${color}, ${color})`;
  };

  const currentColor = getCurrentColor();

  const renderTicks = () => {
    const ticks = [];
    for (let i = 0; i <= 10; i++) {
      const angle = startAngle + (sweepAngle * (i / 10));
      const inner = polarToCartesian(cx, cy, radius - 8, angle);
      const outer = polarToCartesian(cx, cy, radius + 8, angle);
      ticks.push(
        <line
          key={`tick-${i}`}
          x1={inner.x}
          y1={inner.y}
          x2={outer.x}
          y2={outer.y}
          stroke="var(--color-border, #ccc)"
          strokeWidth="2"
        />
      );
    }
    return ticks;
  };

  const renderSegments = () => {
    if (!segments || segments <= 1) return null;
    const lines = [];
    for (let i = 1; i < segments; i++) {
      const angle = startAngle + (sweepAngle * (i / segments));
      const inner = polarToCartesian(cx, cy, radius - 15, angle);
      const outer = polarToCartesian(cx, cy, radius + 15, angle);
      lines.push(
        <line
          key={`seg-${i}`}
          x1={inner.x}
          y1={inner.y}
          x2={outer.x}
          y2={outer.y}
          stroke="var(--color-background-base, #fff)"
          strokeWidth="4"
        />
      );
    }
    return lines;
  };

  return (
    <div 
      className={`ds-DashboardDial ds-DashboardDial--${size}`}
      role="meter"
      aria-valuenow={Math.round(animatedValue)}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-label={label || 'Dial gauge'}
    >
      <svg viewBox="0 0 200 200" className="ds-DashboardDial__svg">
        <path
          d={bgPath}
          fill="none"
          stroke="var(--color-background-alt, #eee)"
          strokeWidth="16"
          strokeLinecap="round"
        />
        
        <path
          d={fgPath}
          fill="none"
          stroke={currentColor}
          strokeWidth="16"
          strokeLinecap="round"
          className="ds-DashboardDial__arc-fg"
        />
        
        {renderTicks()}
        {renderSegments()}
        
        {showValue && (
          <text x="100" y="110" textAnchor="middle" className="ds-DashboardDial__value" fill="var(--color-text-primary, #333)">
            {Math.round(animatedValue)}{unit}
          </text>
        )}
        
        {label && (
          <text x="100" y="140" textAnchor="middle" className="ds-DashboardDial__label" fill="var(--color-text-secondary, #666)">
            {label}
          </text>
        )}
        
        {showMinMax && (
          <>
            <text x="30" y="160" textAnchor="middle" className="ds-DashboardDial__minmax" fill="var(--color-text-secondary, #666)">
              {min}
            </text>
            <text x="170" y="160" textAnchor="middle" className="ds-DashboardDial__minmax" fill="var(--color-text-secondary, #666)">
              {max}
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

export default DashboardDial;
