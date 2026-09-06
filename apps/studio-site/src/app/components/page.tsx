import React from 'react';
import Link from 'next/link';
import { WcagBadge } from '../../components/docs/WcagBadge';
import styles from './page.module.scss';

export default function ComponentsIndexPage() {
  // Mock components data for the grid
  const components = [
    { name: 'Button', slug: 'button', description: 'Interactive element that triggers an action.', group: 'Primitives', status: 'Stable', wcag: 'AAA' },
    { name: 'Input', slug: 'input', description: 'Text input field for user data collection.', group: 'Primitives', status: 'Stable', wcag: 'AA' },
    { name: 'Card', slug: 'card', description: 'Container for related content and actions.', group: 'Display', status: 'Beta', wcag: 'AA' },
    { name: 'Menu', slug: 'menu', description: 'Dropdown list of interactive options.', group: 'Navigation', status: 'Stable', wcag: 'AA' },
    { name: 'Table', slug: 'table', description: 'Data table for tabular information.', group: 'Complex', status: 'Alpha', wcag: 'A' },
  ];

  const groups = [
    { name: 'Primitives', count: 12 },
    { name: 'Display', count: 10 },
    { name: 'Navigation', count: 8 },
    { name: 'Complex', count: 5 }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Components</h1>
        <p>A comprehensive library of accessible, reusable React components built for the design system.</p>
      </header>

      <div className={styles.groups}>
        {groups.map(g => (
          <div key={g.name} className={styles.groupCard}>
            <h3>{g.name}</h3>
            <span>{g.count} Components</span>
          </div>
        ))}
      </div>

      <div className={styles.filters}>
        <button className={styles.filterBtn}>All</button>
        {groups.map(g => (
          <button key={g.name} className={styles.filterBtn}>{g.name}</button>
        ))}
      </div>

      <div className={styles.grid}>
        {components.map(comp => (
          <Link key={comp.slug} href={`/components/${comp.slug}`} className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>{comp.name}</h2>
              <span className={styles.statusBadge}>{comp.status}</span>
            </div>
            <p className={styles.description}>{comp.description}</p>
            <div className={styles.cardFooter}>
              <WcagBadge level={(comp.wcag as any) || 'AA'} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
