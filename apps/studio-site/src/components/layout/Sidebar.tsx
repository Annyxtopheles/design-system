'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, NavItem } from '../../lib/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const [search, setSearch] = useState('');

  const filtered = NAV_ITEMS.filter(item => 
    item.label.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase())
  );

  const groups: { key: NavItem['group']; title: string }[] = [
    { key: 'foundations', title: 'Design Foundations' },
    { key: 'primitives', title: 'Core Primitives' },
    { key: 'display', title: 'Display & Feedback' },
    { key: 'navigation', title: 'Navigation & Overlays' },
    { key: 'complex', title: 'Complex Systems' },
  ];

  return (
    <aside style={{
      width: 'var(--site-sidebar-width, 300px)',
      height: '100vh',
      position: 'sticky',
      top: 0,
      borderRight: '1px solid var(--color-border-default, #e2e8f0)',
      background: 'var(--color-surface-sidebar, #f8fafc)',
      overflowY: 'auto',
      padding: '24px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 800,
          fontSize: '18px'
        }}>
          D
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', color: 'var(--color-text-primary, #0f172a)' }}>
            Studio System
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary, #64748b)' }}>
            v1.0.0 • 1,114 Tokens • 35 Components
          </div>
        </div>
      </div>

      <input 
        type="search" 
        placeholder="Filter components (⌘K)..." 
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 14px',
          borderRadius: '8px',
          border: '1px solid var(--color-border-default, #cbd5e1)',
          background: 'var(--color-background-base, #ffffff)',
          color: 'var(--color-text-primary, #0f172a)',
          fontSize: '0.875rem',
          outline: 'none'
        }}
      />
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {groups.map(group => {
          const items = filtered.filter(i => i.group === group.key);
          if (items.length === 0) return null;

          return (
            <div key={group.key}>
              <h4 style={{
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: 'var(--color-text-tertiary, #94a3b8)',
                marginBottom: '10px',
                paddingLeft: '6px'
              }}>
                {group.title} ({items.length})
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {items.map(item => {
                  const targetHref = `/${item.slug}`;
                  const isActive = pathname === targetHref;

                  return (
                    <li key={item.slug}>
                      <Link 
                        href={targetHref as any} 
                        style={{
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 10px',
                          borderRadius: '6px',
                          fontSize: '0.875rem',
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? 'var(--color-interactive-primary, #2563eb)' : 'var(--color-text-primary, #334155)',
                          background: isActive ? 'var(--color-interactive-primarySubtle, #eff6ff)' : 'transparent',
                          transition: 'background 0.15s ease'
                        }}
                      >
                        <span>{item.label}</span>
                        {item.wcagLevel !== 'N/A' && (
                          <span style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            padding: '2px 5px',
                            borderRadius: '4px',
                            background: item.wcagLevel === 'AAA' ? '#dcfce7' : '#e0e7ff',
                            color: item.wcagLevel === 'AAA' ? '#166534' : '#3730a3'
                          }}>
                            {item.wcagLevel}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
