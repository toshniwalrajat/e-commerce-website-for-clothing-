import './globals.css';
import type { Metadata } from 'next';
import Footer from './components/Footer';
import HeaderWithKey from './components/HeaderWithKey';

export const metadata: Metadata = {
  title: 'Mimosa — Clothing',
  description: 'A clean clothing storefront built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <HeaderWithKey />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
