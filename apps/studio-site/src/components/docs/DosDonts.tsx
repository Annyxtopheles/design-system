import React from 'react';
import styles from './DosDonts.module.scss';
import { CodeBlock } from './CodeBlock';

export interface DoDontItem {
  type?: 'do' | 'dont';
  description?: string;
  code?: string;
  label?: string;
}

export interface DoDontPair {
  do?: DoDontItem;
  dont?: DoDontItem;
  [key: string]: any;
}

export interface DosDontsProps {
  items?: (DoDontPair | DoDontItem)[];
  pairs?: (DoDontPair | DoDontItem)[];
}

export const DosDonts: React.FC<DosDontsProps> = ({ items, pairs }) => {
  const rawList = items || pairs || [];
  if (rawList.length === 0) return null;

  // Normalize: if items are flat objects with type: 'do'|'dont'
  const normalizedPairs: { do: DoDontItem; dont: DoDontItem }[] = [];

  let currentDo: DoDontItem | null = null;
  let currentDont: DoDontItem | null = null;

  for (const item of rawList as any[]) {
    if (item.do || item.dont) {
      normalizedPairs.push({
        do: item.do || { description: 'Follow recommended guidelines.' },
        dont: item.dont || { description: 'Avoid anti-patterns.' }
      });
    } else if (item.type === 'do') {
      currentDo = item;
      if (currentDont) {
        normalizedPairs.push({ do: item, dont: currentDont });
        currentDo = null;
        currentDont = null;
      }
    } else if (item.type === 'dont') {
      currentDont = item;
      if (currentDo) {
        normalizedPairs.push({ do: currentDo, dont: item });
        currentDo = null;
        currentDont = null;
      }
    }
  }

  if (currentDo || currentDont) {
    normalizedPairs.push({
      do: currentDo ?? { description: 'Follow standard design system patterns.' },
      dont: currentDont ?? { description: 'Do not bypass accessibility requirements.' }
    });
  }

  return (
    <div className={styles.grid}>
      {normalizedPairs.map((pair, idx) => (
        <React.Fragment key={idx}>
          <div className={`${styles.card} ${styles.do}`}>
            <div className={styles.cardTitle}>
              <span>✓ </span>
              {pair.do.label || 'DO'}
            </div>
            <p className={styles.cardDesc}>{pair.do.description}</p>
            {pair.do.code && <CodeBlock code={pair.do.code} language="tsx" />}
          </div>

          <div className={`${styles.card} ${styles.dont}`}>
            <div className={styles.cardTitle}>
              <span>✗ </span>
              {pair.dont.label || "DON'T"}
            </div>
            <p className={styles.cardDesc}>{pair.dont.description}</p>
            {pair.dont.code && <CodeBlock code={pair.dont.code} language="tsx" />}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
export default DosDonts;
