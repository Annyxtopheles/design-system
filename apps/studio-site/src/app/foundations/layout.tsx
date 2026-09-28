import React from 'react';
import AppShell from '../../components/layout/AppShell';
import { OnThisPage } from '../../components/docs/OnThisPage';
import styles from './layout.module.scss';

export default function FoundationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell>
      <div className={styles.container}>
        <div className={styles.content}>
          {children}
        </div>
        <aside className={styles.toc}>
          <OnThisPage />
        </aside>
      </div>
    </AppShell>
  );
}
