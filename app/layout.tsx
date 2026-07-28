import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import ChatBot from '@/components/ChatBot';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Jalaj Sharma - Portfolio',
  description:
    'Software Developer with 2 years 6 months of experience building applications at scale — scalable systems, APIs and AI-powered products.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-bg text-fg font-sans antialiased`}
      >
        <Header />
        <main>{children}</main>
        <ChatBot />
      </body>
    </html>
  );
}
