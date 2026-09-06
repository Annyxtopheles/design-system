'use client';

import React, { useState, useMemo } from 'react';
import styles from './ControlPanel.module.scss';
import { PropControl, PropControlProps } from './PropControl';
import { CodeBlock } from './CodeBlock';

interface ControlPanelProps {
  componentName: string;
  defaultProps: Record<string, any>;
  controls: Omit<PropControlProps, 'value' | 'onChange'>[];
  renderComponent: (props: any) => React.ReactNode;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  componentName, defaultProps, controls, renderComponent
}) => {
  const [props, setProps] = useState(defaultProps);
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [key, setKey] = useState(0);

  const handleReset = () => {
    setProps(defaultProps);
    setKey(k => k + 1);
  };

  const handlePropChange = (name: string, value: any) => {
    setProps(prev => ({ ...prev, [name]: value }));
  };

  const generatedCode = useMemo(() => {
    const propsString = Object.entries(props).map(([k, v]) => {
      if (typeof v === 'boolean') return v ? k : `${k}={false}`;
      if (typeof v === 'number') return `${k}={${v}}`;
      if (typeof v === 'string') return `${k}="${v}"`;
      return `${k}={${JSON.stringify(v)}}`;
    }).join(' ');
    
    return `<${componentName} ${propsString} />`;
  }, [props, componentName]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
  };

  return (
    <div className={styles.root}>
      <div className={styles.controlsColumn}>
        <div className={styles.controlsHeader}>
          <h3>Properties</h3>
          <button onClick={handleReset} className={styles.resetButton}>Reset</button>
        </div>
        <div className={styles.controlsList}>
          {controls.map(ctrl => (
            <PropControl 
              key={`${ctrl.name}-${key}`} 
              {...ctrl} 
              value={props[ctrl.name]} 
              onChange={(val) => handlePropChange(ctrl.name, val)} 
            />
          ))}
        </div>
      </div>
      <div className={styles.previewColumn}>
        <div className={styles.previewHeader}>
          <div className={styles.viewportControls}>
            <button onClick={() => setViewport('mobile')} className={viewport === 'mobile' ? styles.active : ''}>Mobile</button>
            <button onClick={() => setViewport('tablet')} className={viewport === 'tablet' ? styles.active : ''}>Tablet</button>
            <button onClick={() => setViewport('desktop')} className={viewport === 'desktop' ? styles.active : ''}>Desktop</button>
          </div>
        </div>
        <div className={`${styles.previewArea} ${styles[viewport]}`}>
          {renderComponent(props)}
        </div>
        <div className={styles.codeArea}>
          <CodeBlock code={generatedCode} language="tsx" />
          <button onClick={handleCopy} className={styles.copyButton}>Copy</button>
        </div>
      </div>
    </div>
  );
};
