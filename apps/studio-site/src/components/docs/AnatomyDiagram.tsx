import React from 'react';
import styles from './AnatomyDiagram.module.scss';

export interface AnatomyLabel {
  id: string;
  label: string;
  description: string;
  x: number; 
  y: number;
}

export interface AnatomyDiagramProps {
  componentName: string;
  labels: AnatomyLabel[];
  children: React.ReactNode;
}

export const AnatomyDiagram: React.FC<AnatomyDiagramProps> = ({ componentName, labels, children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.diagramArea}>
        <div className={styles.componentWrapper}>
          {children}
        </div>
        {labels.map((label, idx) => (
          <div 
            key={label.id} 
            className={styles.labelMarker}
            style={{ left: `${label.x}%`, top: `${label.y}%` }}
          >
            <div className={styles.markerPoint}>
              <span>{idx + 1}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.legendArea}>
        <h4>{componentName} Anatomy</h4>
        <dl className={styles.legendList}>
          {labels.map((label, idx) => (
            <div key={label.id} className={styles.legendItem}>
              <dt>
                <span className={styles.numberBadge}>{idx + 1}</span>
                {label.label}
              </dt>
              <dd>{label.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
