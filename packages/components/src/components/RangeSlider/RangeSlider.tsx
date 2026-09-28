import React, { useState, useEffect } from 'react';
import './RangeSlider.scss';

export interface RangeSliderProps {
  min?: number;
  max?: number;
  value?: [number, number];
  onChange?: (v: [number, number]) => void;
  step?: number;
  label?: string;
  disabled?: boolean;
  formatValue?: (v: number) => string;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min = 0,
  max = 100,
  value = [20, 80],
  onChange,
  step = 1,
  label,
  disabled = false,
  formatValue = (v) => String(v),
}) => {
  const [internalVal, setInternalVal] = useState<[number, number]>(value);
  const minVal = internalVal[0];
  const maxVal = internalVal[1];

  useEffect(() => {
    setInternalVal(value);
  }, [value]);

  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const v = Math.min(Number(e.target.value), maxVal - step);
    setInternalVal([v, maxVal]);
    onChange?.([v, maxVal]);
  };

  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const v = Math.max(Number(e.target.value), minVal + step);
    setInternalVal([minVal, v]);
    onChange?.([minVal, v]);
  };

  const minPercent = ((minVal - min) / (max - min)) * 100;
  const maxPercent = ((maxVal - min) / (max - min)) * 100;

  return (
    <div className={`ds-RangeSlider ${disabled ? 'ds-RangeSlider--disabled' : ''}`}>
      {label && (
        <div className="ds-RangeSlider__header">
          <span className="ds-RangeSlider__label">{label}</span>
          <span className="ds-RangeSlider__range-display">
            {formatValue(minVal)} – {formatValue(maxVal)}
          </span>
        </div>
      )}

      <div className="ds-RangeSlider__track-container">
        <div className="ds-RangeSlider__track" />
        <div
          className="ds-RangeSlider__fill"
          style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          disabled={disabled}
          onChange={handleMin}
          className="ds-RangeSlider__thumb ds-RangeSlider__thumb--left"
          aria-label={label ? `${label} Minimum` : 'Minimum value'}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          disabled={disabled}
          onChange={handleMax}
          className="ds-RangeSlider__thumb ds-RangeSlider__thumb--right"
          aria-label={label ? `${label} Maximum` : 'Maximum value'}
        />

        <div className="ds-RangeSlider__tooltip ds-RangeSlider__tooltip--left" style={{ left: `${minPercent}%` }}>
          {formatValue(minVal)}
        </div>
        <div className="ds-RangeSlider__tooltip ds-RangeSlider__tooltip--right" style={{ left: `${maxPercent}%` }}>
          {formatValue(maxVal)}
        </div>
      </div>

      <div className="ds-RangeSlider__footer">
        <span className="ds-RangeSlider__bound">{formatValue(min)}</span>
        <span className="ds-RangeSlider__bound">{formatValue(max)}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
