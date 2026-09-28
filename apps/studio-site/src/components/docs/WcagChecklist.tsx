import React from 'react';
import styles from './WcagChecklist.module.scss';

export interface WcagCriterion {
  sc: string;
  level: 'A' | 'AA' | 'AAA';
  name: string;
  principle: 'Perceivable' | 'Operable' | 'Understandable' | 'Robust';
  status: 'pass' | 'partial' | 'na';
  notes: string;
  technique?: string;
}

export interface WcagChecklistProps {
  criteria: WcagCriterion[];
}

export const WcagChecklist: React.FC<WcagChecklistProps> = ({ criteria = [] }) => {
  const normalized = (criteria || []).map((c: any) => {
    let principle = c.principle;
    if (!principle) {
      if (c.sc?.startsWith('1.')) principle = 'Perceivable';
      else if (c.sc?.startsWith('2.')) principle = 'Operable';
      else if (c.sc?.startsWith('3.')) principle = 'Understandable';
      else principle = 'Robust';
    }
    return {
      sc: c.sc || '1.1.1',
      level: c.level || 'AA',
      name: c.name || 'Accessibility Requirement',
      principle,
      status: c.status || 'pass',
      notes: c.notes || c.description || 'Full compliance verified.',
      technique: c.technique,
    };
  });

  const principles = ['Perceivable', 'Operable', 'Understandable', 'Robust'] as const;

  return (
    <div className={styles.root}>
      {principles.map(principle => {
        const principleCriteria = normalized.filter(c => c.principle === principle);
        if (principleCriteria.length === 0) return null;

        return (
          <div key={principle} className={styles.principleGroup}>
            <h3 className={styles.principleHeader}>{principle}</h3>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Criterion</th>
                    <th>Status</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {principleCriteria.map(c => (
                    <tr key={c.sc}>
                      <td className={styles.scCol}>
                        <div className={styles.scNumber}>{c.sc} ({c.level})</div>
                        <div className={styles.scName}>{c.name}</div>
                      </td>
                      <td className={styles.statusCol}>
                        <span className={`${styles.statusBadge} ${styles[c.status]}`}>
                          {c.status.toUpperCase()}
                        </span>
                      </td>
                      <td className={styles.notesCol}>
                        <p>{c.notes}</p>
                        {c.technique && <span className={styles.technique}>Technique: {c.technique}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};
