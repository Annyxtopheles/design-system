import React from 'react';
import AppShell from '../../components/layout/AppShell';

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
