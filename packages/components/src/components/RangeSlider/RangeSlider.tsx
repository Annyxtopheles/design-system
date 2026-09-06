import React, { useState, useRef, useEffect } from 'react';
import './RangeSlider.scss';

export interface RangeSliderProps {
  min?: number; max?: number; value?: [number, number]; onChange?: (v: [number, number]) => void; step?: number;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({ min = 0, max = 100, value = [20, 80], onChange, step = 1 }) => {
  const [internalVal, setInternalVal] = useState<[number, number]>(value);
  const minVal = internalVal[0];
  const maxVal = internalVal[1];

  useEffect(() => { setInternalVal(value); }, [value]);

  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.min(Number(e.target.value), maxVal - step);
    setInternalVal([v, maxVal]);
    onChange?.([v, maxVal]);
  };

  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.max(Number(e.target.value), minVal + step);
    setInternalVal([minVal, v]);
    onChange?.([minVal, v]);
  };

  const minPercent = ((minVal - min) / (max - min)) * 100;
  const maxPercent = ((maxVal - min) / (max - min)) * 100;

  return (
    <div className="ds-RangeSlider">
      <div className="ds-RangeSlider__track-container">
        <div className="ds-RangeSlider__track"></div>
        <div className="ds-RangeSlider__fill" style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}></div>
        <input type="range" min={min} max={max} step={step} value={minVal} onChange={handleMin} className="ds-RangeSlider__thumb ds-RangeSlider__thumb--left" />
        <input type="range" min={min} max={max} step={step} value={maxVal} onChange={handleMax} className="ds-RangeSlider__thumb ds-RangeSlider__thumb--right" />
        
        <div className="ds-RangeSlider__tooltip" style={{ left: `${minPercent}%` }}>{minVal}</div>
        <div className="ds-RangeSlider__tooltip" style={{ left: `${maxPercent}%` }}>{maxVal}</div>
      </div>
    </div>
  );
};
export default RangeSlider;
