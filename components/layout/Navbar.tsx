'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Semua', icon: '[*]' },
  { href: '/category/VIDEO', label: 'Video', icon: '[▶]' },
  { href: '/category/AUDIO', label: 'Audio', icon: '[♪]' },
  { href: '/category/IMAGE', label: 'Gambar', icon: '[■]' },
  { href: '/category/ARTICLE', label: 'Artikel', icon: '[≡]' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sembunyikan Navbar publik saat berada di halaman admin
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-black border-b-4 border-black dark:border-white transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            id="navbar-logo"
          >
            <div className="flex h-10 w-10 items-center justify-center bg-[#fde047] brutal-border brutal-shadow group-hover:bg-[#facc15] transition-colors">
              <span className="text-black font-black text-xl leading-none" aria-hidden="true">⚡</span>
            </div>
            <span className="font-bold text-black dark:text-white text-xl uppercase tracking-widest">
              Media<span className="text-[#f87171]">Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wider brutal-border transition-all',
                    isActive
                      ? 'bg-black text-white dark:bg-white dark:text-black brutal-shadow'
                      : 'bg-white text-black dark:bg-black dark:text-white hover:bg-[#4ade80] dark:hover:bg-[#4ade80] dark:hover:text-black brutal-shadow brutal-shadow-hover'
                  )}
                >
                  <span className="font-mono text-base">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side / Search & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Desktop Search */}
            <form action="/search" className="hidden md:flex items-center">
              <input
                type="text"
                name="q"
                placeholder="CARI KONTEN..."
                className="h-10 w-48 border-4 border-black dark:border-white px-3 font-mono text-sm font-bold uppercase text-black dark:text-white bg-white dark:bg-black placeholder:text-gray-400 focus:outline-none focus:ring-0 brutal-shadow transition-all focus:w-64"
              />
              <button
                type="submit"
                className="h-10 border-y-4 border-r-4 border-black dark:border-white bg-[#fde047] px-3 font-mono font-black text-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                aria-label="Cari"
              >
                [?]
              </button>
            </form>

            {/* Mobile menu button */}
            <button
              id="navbar-mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 brutal-border bg-white dark:bg-black text-black dark:text-white hover:bg-[#fde047] dark:hover:bg-[#fde047] dark:hover:text-black brutal-shadow brutal-shadow-hover transition-colors font-mono font-bold text-lg leading-none w-10 h-10 flex items-center justify-center"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? '[X]' : '[=]'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t-4 border-black dark:border-white bg-white dark:bg-black px-4 py-4 space-y-3">
          {/* Mobile Search */}
          <form action="/search" className="flex items-center mb-4">
            <input
              type="text"
              name="q"
              placeholder="CARI KONTEN..."
              className="h-12 w-full border-4 border-black dark:border-white px-3 font-mono text-sm font-bold uppercase text-black dark:text-white bg-white dark:bg-black placeholder:text-gray-400 focus:outline-none focus:ring-0"
            />
            <button
              type="submit"
              className="h-12 border-y-4 border-r-4 border-black dark:border-white bg-[#fde047] px-4 font-mono font-black text-black"
            >
              [?]
            </button>
          </form>

          {navItems.map((item) => {
            const isActive =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
               <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wider brutal-border transition-all',
                  isActive
                    ? 'bg-black text-white dark:bg-white dark:text-black brutal-shadow'
                    : 'bg-white text-black dark:bg-black dark:text-white hover:bg-[#4ade80] dark:hover:bg-[#4ade80] dark:hover:text-black brutal-shadow brutal-shadow-hover'
                )}
              >
                <span className="font-mono text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
