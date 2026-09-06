import React from 'react';
import { OnThisPage } from '../../components/docs/OnThisPage';
import styles from './layout.module.scss';

export default function FoundationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <nav>
          <ul>
            <li>Color</li>
            <li>Typography</li>
            <li>Spacing</li>
            <li>Elevation</li>
            <li>Motion</li>
            <li>Border</li>
          </ul>
        </nav>
      </aside>

      <main className={styles.main}>
        <div className={styles.breadcrumbs}>
          <span>Home</span> &gt; <span>Foundations</span>
        </div>
        
        <div className={styles.contentArea}>
          {children}
        </div>
      </main>

      <aside className={styles.toc}>
        <OnThisPage />
      </aside>
    </div>
  );
}
