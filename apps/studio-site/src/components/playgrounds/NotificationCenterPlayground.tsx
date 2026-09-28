'use client';
import React from 'react';
import { NotificationCenter } from '@design-system/components';
import { ControlPanel } from '@/components/docs/ControlPanel';

export default function NotificationCenterPlayground() {
  const defaultProps = {
    showSampleBadge: true,
  };

  const controls = [
    { name: 'showSampleBadge', label: 'Include Unread Notifications', type: 'toggle' },
  ];

  const sampleNotifications = [
    { id: '1', title: 'Design System v1.1 Released', message: 'Includes 17 upgraded playgrounds and theme-adaptive shadows.', type: 'success', timestamp: new Date(), read: false },
    { id: '2', title: 'WCAG 2.2 AAA Audit Passed', message: 'All 35 components pass automated contrast and focus accessibility tests.', type: 'info', timestamp: new Date(Date.now() - 1000 * 60 * 15), read: false },
    { id: '3', title: 'Performance Warning', message: 'CSS bundle optimized by stripping redundant token metadata.', type: 'warning', timestamp: new Date(Date.now() - 1000 * 3600 * 2), read: true },
  ];

  return (
    <ControlPanel
      componentName="NotificationCenter"
      defaultProps={defaultProps}
      controls={controls as any}
      renderComponent={(props) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '380px', padding: '32px' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
            Click the bell icon to open the notifications panel:
          </p>
          <NotificationCenter
            notifications={props.showSampleBadge ? sampleNotifications : []}
          />
        </div>
      )}
    />
  );
}