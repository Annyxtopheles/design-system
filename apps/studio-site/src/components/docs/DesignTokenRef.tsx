import React from 'react';
import styles from './DesignTokenRef.module.scss';

export interface TokenRef {
  cssVar: string;
  value: string;
  category: 'color' | 'typography' | 'spacing' | 'elevation' | 'motion' | 'border';
  usage: string;
}

export interface DesignTokenRefProps {
  tokens: TokenRef[];
}

export const DesignTokenRef: React.FC<DesignTokenRefProps> = ({ tokens = [] }) => {
  const safeTokens = Array.isArray(tokens) ? tokens : [];
  if (safeTokens.length === 0) {
    return <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>No tokens registered.</p>;
  }

  const renderSpecimen = (token: TokenRef) => {
    switch (token.category) {
      case 'color':
        return (
          <div className={styles.colorSpecimen}>
            <div className={styles.colorSwatch} style={{ backgroundColor: token.value }} />
            <span>{token.value}</span>
          </div>
        );
      case 'typography':
      case 'spacing':
      case 'elevation':
      case 'motion':
      case 'border':
      default:
        return <code>{token.value}</code>;
    }
  };

  return (
    <div className={styles.root}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          {safeTokens.map((token, i) => (
            <tr key={`${token.cssVar || 'token'}-${i}`}>
              <td><code>{token.cssVar}</code></td>
              <td>{renderSpecimen(token)}</td>
              <td>{token.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
