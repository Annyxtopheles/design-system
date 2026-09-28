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
  componentName,
  defaultProps,
  controls,
  renderComponent,
}) => {
  const [props, setProps] = useState(defaultProps);
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);

  const handleReset = () => {
    setProps(defaultProps);
    setKey((k) => k + 1);
  };

  const handlePropChange = (name: string, value: any) => {
    setProps((prev) => ({ ...prev, [name]: value }));
  };

  const generatedCode = useMemo(() => {
    const propsString = Object.entries(props)
      .filter(([_, v]) => v !== undefined && v !== false)
      .map(([k, v]) => {
        if (typeof v === 'boolean') return v ? k : `${k}={false}`;
        if (typeof v === 'number') return `${k}={${v}}`;
        if (typeof v === 'string') return `${k}="${v}"`;
        return `${k}={${JSON.stringify(v)}}`;
      })
      .join(' ');

    return propsString ? `<${componentName} ${propsString} />` : `<${componentName} />`;
  }, [props, componentName]);

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={styles.root}>
      {/* Controls panel */}
      <div className={styles.controlsColumn}>
        <div className={styles.controlsHeader}>
          <h3>Properties</h3>
          <button type="button" onClick={handleReset} className={styles.resetButton}>
            Reset
          </button>
        </div>
        <div className={styles.controlsList}>
          {controls.map((ctrl) => (
            <PropControl
              key={`${ctrl.name}-${key}`}
              {...ctrl}
              value={props[ctrl.name]}
              onChange={(val) => handlePropChange(ctrl.name, val)}
            />
          ))}
        </div>
      </div>

      {/* Preview and code panel */}
      <div className={styles.previewColumn}>
        {/* Viewport Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.viewportToggles}>
            <button
              type="button"
              onClick={() => setViewport('mobile')}
              className={viewport === 'mobile' ? styles.active : ''}
              title="Mobile viewport (375px)"
            >
              <span>📱</span>
              <span>Mobile</span>
            </button>
            <button
              type="button"
              onClick={() => setViewport('tablet')}
              className={viewport === 'tablet' ? styles.active : ''}
              title="Tablet viewport (768px)"
            >
              <span>💻</span>
              <span>Tablet</span>
            </button>
            <button
              type="button"
              onClick={() => setViewport('desktop')}
              className={viewport === 'desktop' ? styles.active : ''}
              title="Full width desktop viewport"
            >
              <span>🖥️</span>
              <span>Desktop</span>
            </button>
          </div>
        </div>

        {/* Live rendered component in viewport frame */}
        <div className={styles.previewFrameWrapper}>
          <div className={`${styles.previewFrame} ${styles[viewport]}`}>
            {renderComponent(props)}
          </div>
        </div>

        {/* Generated Code Area */}
        <div className={styles.codePanel}>
          <div className={styles.codePanelHeader}>
            <span>JSX Output</span>
            <button
              type="button"
              onClick={handleCopy}
              className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
            >
              {copied ? '✓ Copied' : 'Copy Code'}
            </button>
          </div>
          <CodeBlock code={generatedCode} language="tsx" hideCopyButton />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
