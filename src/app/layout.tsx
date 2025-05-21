import type { Metadata } from 'next';
import { Inter as Geist, Inter as Geist_Mono } from 'next/font/google'; // Using Inter as a substitute for Geist for broader availability
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AppShell } from '@/components/layout/AppShell';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: '--font-geist-sans', // You can keep this variable name if preferred
  subsets: ['latin'],
});

const geistMono = Geist_Mono({ // Using Inter for mono as well
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Chronicle Canvas',
  description: 'A modern blog platform inspired by timeless design.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <AppShell>
            {children}
          </AppShell>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
