import type { Metadata } from 'next';
import { Bricolage_Grotesque } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import { ToastProvider } from '@/components/ui/Toast';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'MediaHub — Brutal Multimedia',
    template: '%s | MediaHub',
  },
  description:
    'A brutalist multimedia content management system and news portal.',
  keywords: ['multimedia', 'cms', 'news portal', 'brutalism'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`dark ${bricolage.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" disableTransitionOnChange>
          <ToastProvider>
            <div className="flex min-h-screen flex-col border-x-4 border-black dark:border-white max-w-7xl mx-auto shadow-[12px_0_0_0_#000,-12px_0_0_0_#000] dark:shadow-[12px_0_0_0_#fff,-12px_0_0_0_#fff] lg:shadow-none lg:border-x-8 bg-white dark:bg-black transition-colors">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
