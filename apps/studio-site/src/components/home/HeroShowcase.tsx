'use client';

import React, { useState } from 'react';
import { Button, Badge, Switch, ProgressBar, Avatar, Chip } from '@design-system/components';

export default function HeroShowcase() {
  const [copied, setCopied] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [selectedTag, setSelectedTag] = useState('AAA Contrast');
  const [progressVal, setProgressVal] = useState(85);

  const installCommand = 'npm install @design-system/tokens @design-system/components';

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', maxWidth: '840px', margin: '0 auto' }}>
      {/* 1-Click Install Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--color-surface-card, #ffffff)',
          border: '1px solid var(--color-border-default, #cbd5e1)',
          borderRadius: '12px',
          padding: '8px 12px 8px 18px',
          boxShadow: 'var(--elevation-2, 0 4px 6px -1px rgba(0, 0, 0, 0.05))',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
          <span style={{ color: 'var(--color-interactive-primary, #2563eb)', fontWeight: 700, userSelect: 'none' }}>
            $
          </span>
          <code
            style={{
              fontSize: '0.9rem',
              color: 'var(--color-text-primary, #0f172a)',
              background: 'transparent',
              padding: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {installCommand}
          </code>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          style={{
            background: copied ? 'var(--color-status-success, #16a34a)' : 'var(--color-background-subtle, #f1f5f9)',
            color: copied ? '#ffffff' : 'var(--color-text-primary, #0f172a)',
            border: '1px solid var(--color-border-default, #cbd5e1)',
            borderRadius: '6px',
            padding: '6px 14px',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            whiteSpace: 'nowrap',
          }}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>

      {/* Interactive Live Component Showcase Card */}
      <div
        style={{
          background: 'var(--color-surface-card, #ffffff)',
          border: '1px solid var(--color-border-default, #e2e8f0)',
          borderRadius: '16px',
          boxShadow: 'var(--elevation-4, 0 10px 15px -3px rgba(0, 0, 0, 0.08))',
          overflow: 'hidden',
        }}
      >
        {/* Showcase Header */}
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--color-border-default, #e2e8f0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--color-background-subtle, #f8fafc)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary, #64748b)', marginLeft: '8px' }}>
              Interactive Live System Preview
            </span>
          </div>
          <Badge variant="success" dot size="sm">
            Live Token Bridge
          </Badge>
        </div>

        {/* Showcase Body */}
        <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* User profile row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Avatar name="Studio Design" size="lg" status="online" />
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-text-primary, #0f172a)' }}>
                  Design System Studio
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary, #64748b)' }}>
                  Production Token Registry & Component Library
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Switch
                label="Live Token Sync"
                checked={autoSync}
                onChange={(e) => setAutoSync(e.target.checked)}
              />
            </div>
          </div>

          {/* Interactive Progress indicator */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600, color: 'var(--color-text-primary, #0f172a)' }}>
                System Calibration Status
              </span>
              <span style={{ color: 'var(--color-interactive-primary, #2563eb)', fontWeight: 700 }}>
                {autoSync ? `${progressVal}% Calibrated` : 'Sync Paused'}
              </span>
            </div>
            <ProgressBar value={autoSync ? progressVal : 30} />
          </div>

          {/* Chip filter group */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary, #64748b)', marginRight: '4px' }}>
              Tags:
            </span>
            {['AAA Contrast', '4 Themes', '1,114 Tokens', 'Pure SCSS', 'Zero Runtime'].map((tag) => (
              <Chip
                key={tag}
                label={tag}
                selected={selectedTag === tag}
                onClick={() => setSelectedTag(tag)}
              />
            ))}
          </div>

          {/* Action button row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', paddingTop: '8px', borderTop: '1px solid var(--color-border-subtle, #f1f5f9)' }}>
            <Button
              variant="primary"
              size="md"
              onClick={() => setProgressVal((p) => (p >= 100 ? 50 : p + 10))}
            >
              Boost Calibration (+10%)
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => setProgressVal(85)}
            >
              Reset State
            </Button>
            <Button
              variant="ghost"
              size="md"
            >
              Inspect Source
            </Button>
            <Button
              variant="danger"
              size="md"
              onClick={() => setProgressVal(0)}
            >
              Drain
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
