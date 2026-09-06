import React from 'react';
import styles from './WcagBadge.module.scss';

export interface WcagBadgeProps {
  level: 'A' | 'AA' | 'AAA';
}

export const WcagBadge: React.FC<WcagBadgeProps> = ({ level }) => {
  return (
    <span className={`${styles.root} ${styles[`level${level}`]}`}>
      WCAG 2.2 {level}
    </span>
  );
};
