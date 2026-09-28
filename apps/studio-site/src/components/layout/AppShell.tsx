'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import styles from './AppShell.module.scss';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={styles.shell}>
      {/* Mobile Backdrop */}
      <div
        className={`${styles.backdrop} ${mobileOpen ? styles.open : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar (Desktop sticky / Mobile drawer) */}
      <div className={`${styles.sidebarWrapper} ${mobileOpen ? styles.open : ''}`}>
        <Sidebar
          onNavigate={() => setMobileOpen(false)}
          onClose={() => setMobileOpen(false)}
        />
      </div>

      {/* Main Content Area */}
      <div className={styles.mainContent}>
        <Header onToggleMobileSidebar={() => setMobileOpen((prev) => !prev)} />
        <main id="main" className={styles.pageContainer}>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
