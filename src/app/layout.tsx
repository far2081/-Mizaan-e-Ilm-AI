import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'میزانِ علم AI — Mizaan-e-Ilm AI | Source-Locked Islamic Research',
  description: 'A source-locked Islamic research and fatwa-reference platform with multi-tradition isolation and strict citation verification. Created by NEXORA AI.',
  icons: {
    icon: '/logo.jpg',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ur" dir="rtl">
      <body className="antialiased selection:bg-emerald-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
