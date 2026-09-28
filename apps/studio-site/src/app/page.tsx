import Link from 'next/link';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroShowcase from '../components/home/HeroShowcase';
import { NAV_ITEMS } from '../lib/navigation';

export default function HomePage() {
  const foundations = NAV_ITEMS.filter((i) => i.group === 'foundations');
  const primitives = NAV_ITEMS.filter((i) => i.group === 'primitives');
  const display = NAV_ITEMS.filter((i) => i.group === 'display');
  const navigation = NAV_ITEMS.filter((i) => i.group === 'navigation');
  const complex = NAV_ITEMS.filter((i) => i.group === 'complex');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-background-base, #ffffff)', color: 'var(--color-text-primary, #0f172a)' }}>
      <Header />

      <main id="main" style={{ flex: 1, padding: 'var(--spacing-2xl, 40px) var(--spacing-xl, 24px)', maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        {/* ── Hero Section ── */}
        <section style={{ textAlign: 'center', marginBottom: 'var(--spacing-4xl, 64px)', marginTop: 'var(--spacing-2xl, 32px)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'var(--color-interactive-primarySubtle, #eff6ff)',
              color: 'var(--color-interactive-primary, #2563eb)',
              fontSize: '0.82rem',
              fontWeight: 700,
              marginBottom: '20px',
              border: '1px solid var(--color-interactive-primarySubtle, #bfdbfe)',
            }}
          >
            <span>✨</span>
            <span>Design System Studio v1.0.0 · Production Ready</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: '20px',
              maxWidth: '900px',
              margin: '0 auto 20px',
            }}
          >
            The Complete Token-Driven Design System & Component Studio
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--color-text-secondary, #64748b)',
              maxWidth: '780px',
              margin: '0 auto 36px',
              lineHeight: 1.6,
            }}
          >
            1,114 mathematically derived design tokens across 4 themes, 35 production-ready React components with strict WCAG 2.2 accessibility, and 0 external UI framework dependencies.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
            <Link
              href="/components/button"
              style={{
                padding: '14px 28px',
                background: 'var(--color-interactive-primary, #2563eb)',
                color: '#ffffff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                boxShadow: 'var(--elevation-2, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
              }}
            >
              Explore 35 Components →
            </Link>
            <Link
              href="/foundations/colors"
              style={{
                padding: '14px 28px',
                background: 'var(--color-background-subtle, #f1f5f9)',
                color: 'var(--color-text-primary, #0f172a)',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                border: '1px solid var(--color-border-default, #cbd5e1)',
              }}
            >
              Design Foundations
            </Link>
          </div>

          {/* Interactive Live Hero Showcase */}
          <HeroShowcase />
        </section>

        {/* ── Key Metrics ── */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '64px',
          }}
        >
          {[
            { metric: '1,114', label: 'Design Tokens', sub: 'Color, Typo, Spacing, Shadow, Motion, Border' },
            { metric: '35', label: 'React Components', sub: 'Zero mock stubs · 100% interactive & tested' },
            { metric: '4', label: 'Calibrated Themes', sub: 'Light, Dark, High-Contrast AAA, Cosmic Neon' },
            { metric: '0', label: 'External UI Deps', sub: 'Pure React + Native CSS Custom Properties' },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--color-surface-card, #ffffff)',
                border: '1px solid var(--color-border-default, #e2e8f0)',
                borderRadius: '12px',
                padding: '24px 20px',
                textAlign: 'center',
                boxShadow: 'var(--elevation-1, 0 1px 3px rgba(0,0,0,0.05))',
              }}
            >
              <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--color-interactive-primary, #2563eb)', lineHeight: 1 }}>
                {item.metric}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, margin: '8px 0 4px', color: 'var(--color-text-primary, #0f172a)' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary, #64748b)' }}>
                {item.sub}
              </div>
            </div>
          ))}
        </section>

        {/* ── Design Foundations Showcase ── */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 6px' }}>
              Design Foundations
            </h2>
            <p style={{ color: 'var(--color-text-secondary, #64748b)', margin: 0 }}>
              The mathematical core governing typography, spatial geometry, color palettes, and depth layers.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px',
            }}
          >
            {foundations.map((f) => (
              <Link
                key={f.slug}
                href={`/${f.slug}` as any}
                style={{
                  display: 'block',
                  background: 'var(--color-surface-card, #ffffff)',
                  border: '1px solid var(--color-border-default, #e2e8f0)',
                  borderRadius: '12px',
                  padding: '24px',
                  textDecoration: 'none',
                  color: 'inherit',
                  boxShadow: 'var(--elevation-1, 0 1px 3px rgba(0,0,0,0.05))',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--color-interactive-primary, #2563eb)' }}>
                    {f.label}
                  </h3>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'var(--color-interactive-primarySubtle, #eff6ff)',
                      color: 'var(--color-interactive-primary, #2563eb)',
                    }}
                  >
                    Foundations →
                  </span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary, #64748b)', margin: 0, lineHeight: 1.5 }}>
                  {f.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Component Catalog Directory ── */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 6px' }}>
              35 Production Components
            </h2>
            <p style={{ color: 'var(--color-text-secondary, #64748b)', margin: 0 }}>
              Full ARIA roles, live interactive playgrounds, TypeScript props documentation, and WCAG 2.2 checklist for every component.
            </p>
          </div>

          {[
            { title: 'Core Primitives', items: primitives },
            { title: 'Display & Feedback', items: display },
            { title: 'Navigation & Overlays', items: navigation },
            { title: 'Complex Systems & Composites', items: complex },
          ].map((cat) => (
            <div key={cat.title} style={{ marginBottom: '36px' }}>
              <h3
                style={{
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontWeight: 800,
                  color: 'var(--color-text-tertiary, #94a3b8)',
                  marginBottom: '14px',
                }}
              >
                {cat.title} ({cat.items.length})
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: '14px',
                }}
              >
                {cat.items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${item.slug}` as any}
                    style={{
                      background: 'var(--color-surface-card, #ffffff)',
                      border: '1px solid var(--color-border-default, #e2e8f0)',
                      borderRadius: '8px',
                      padding: '14px 16px',
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'border-color 0.15s ease',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-text-primary, #0f172a)' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--color-text-tertiary, #64748b)', marginTop: '2px' }}>
                        {item.status}
                      </div>
                    </div>
                    {item.wcagLevel !== 'N/A' && (
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: item.wcagLevel === 'AAA' ? '#dcfce7' : '#e0e7ff',
                          color: item.wcagLevel === 'AAA' ? '#166534' : '#3730a3',
                        }}
                      >
                        {item.wcagLevel}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
