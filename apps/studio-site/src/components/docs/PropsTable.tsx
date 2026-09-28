import React from 'react';
import styles from './PropsTable.module.scss';

export interface PropDefinition {
  name: string;
  type: string;
  default: string;
  required: boolean;
  description: string;
  since?: string;
}

export interface PropsTableProps {
  props: PropDefinition[];
}

export const PropsTable: React.FC<PropsTableProps> = ({ props = [] }) => {
  const safeProps = Array.isArray(props) ? props : [];
  if (safeProps.length === 0) {
    return <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>Standard HTML / React attributes apply.</p>;
  }

  return (
    <div className={styles.root}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, idx) => (
            <tr key={prop.name} className={idx % 2 === 0 ? styles.even : styles.odd}>
              <td className={styles.nameCol}>
                <code>{prop.name}</code>
                {prop.required && <span className={styles.requiredBadge}>*</span>}
              </td>
              <td className={styles.typeCol}>
                <code className={styles.typeChip}>{prop.type}</code>
              </td>
              <td className={styles.defaultCol}>
                {prop.default ? <code>{prop.default}</code> : <span className={styles.noDefault}>-</span>}
              </td>
              <td className={styles.descCol}>
                <p>{prop.description}</p>
                {prop.since && <span className={styles.since}>Added in {prop.since}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
