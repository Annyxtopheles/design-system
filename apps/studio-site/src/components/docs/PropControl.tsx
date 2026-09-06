'use client';

import React from 'react';
import styles from './PropControl.module.scss';

export interface PropControlProps {
  name: string;
  type: 'slider' | 'toggle' | 'select' | 'text' | 'number' | 'color';
  value: unknown;
  onChange: (value: unknown) => void;
  label: string;
  description?: string;
  options?: Array<{label: string; value: string | number | boolean}>;
  min?: number; max?: number; step?: number;
  placeholder?: string;
}

export const PropControl: React.FC<PropControlProps> = ({
  name, type, value, onChange, label, description, options, min, max, step, placeholder
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let val: any = e.target.value;
    if (type === 'toggle') {
      val = (e.target as HTMLInputElement).checked;
    } else if (type === 'number' || type === 'slider') {
      val = Number(val);
    }
    onChange(val);
  };

  const renderControl = () => {
    switch (type) {
      case 'slider':
        return (
          <div className={styles.sliderContainer}>
            <input 
              type="range" 
              className={styles.slider} 
              value={value as number} 
              onChange={handleChange}
              min={min} max={max} step={step}
            />
            <span className={styles.sliderValue}>{value as React.ReactNode}</span>
          </div>
        );
      case 'toggle':
        return (
          <label className={styles.toggle}>
            <input 
              type="checkbox" 
              checked={value as boolean} 
              onChange={handleChange}
            />
            <span className={styles.toggleSlider}></span>
          </label>
        );
      case 'select':
        return (
          <select className={styles.select} value={value as string} onChange={handleChange}>
            {options?.map(opt => (
              <option key={String(opt.value)} value={String(opt.value)}>{opt.label}</option>
            ))}
          </select>
        );
      case 'text':
        return (
          <input 
            type="text" 
            className={styles.input} 
            value={value as string} 
            onChange={handleChange} 
            placeholder={placeholder} 
          />
        );
      case 'number':
        return (
          <input 
            type="number" 
            className={styles.input} 
            value={value as number} 
            onChange={handleChange}
            min={min} max={max} step={step} 
          />
        );
      case 'color':
        return (
          <div className={styles.colorContainer}>
            <input 
              type="color" 
              className={styles.colorInput} 
              value={value as string} 
              onChange={handleChange} 
            />
            <input 
              type="text" 
              className={styles.input} 
              value={value as string} 
              onChange={handleChange} 
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <label className={styles.label}>{label}</label>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <div className={styles.control}>
        {renderControl()}
      </div>
    </div>
  );
};
