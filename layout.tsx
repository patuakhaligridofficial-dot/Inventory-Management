import type { ReactNode } from 'react';

export const metadata = { title: 'অফিস স্টোর ব্যবস্থাপনা' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="bn">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, background: '#f6f7f9', color: '#1a1a1a' }}>{children}</body>
    </html>
  );
}
