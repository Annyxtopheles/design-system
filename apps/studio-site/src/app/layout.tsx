import type { Metadata } from 'next';
import './globals.scss';
import { ThemeProvider } from '../components/layout/ThemeProvider';

export const metadata: Metadata = {
  title: {
    template: '%s | Design System Studio',
    default: 'Design System Studio',
  },
  description: 'A production-grade design token system and React component library',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a href="#main" className="ss-skip-link">Skip to main content</a>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
