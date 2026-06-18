'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();

  // Sembunyikan Footer publik saat berada di halaman admin
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="border-t-4 border-black dark:border-white bg-white dark:bg-black mt-auto transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-black dark:bg-white brutal-border brutal-shadow">
              <span className="text-white dark:text-black font-black text-xl leading-none" aria-hidden="true">⚡</span>
            </div>
            <span className="font-bold text-black dark:text-white text-2xl uppercase tracking-widest">
              Media<span className="text-[#f87171]">Hub</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-bold uppercase tracking-wider text-black dark:text-white">
            <Link href="/" className="hover:bg-[#fde047] hover:text-black dark:hover:text-black px-2 py-1 brutal-border transition-colors">Beranda</Link>
            <Link href="/category/VIDEO" className="hover:bg-[#fde047] hover:text-black dark:hover:text-black px-2 py-1 brutal-border transition-colors">Video</Link>
            <Link href="/category/AUDIO" className="hover:bg-[#fde047] hover:text-black dark:hover:text-black px-2 py-1 brutal-border transition-colors">Audio</Link>
            <Link href="/category/IMAGE" className="hover:bg-[#fde047] hover:text-black dark:hover:text-black px-2 py-1 brutal-border transition-colors">Gambar</Link>
            <Link href="/category/ARTICLE" className="hover:bg-[#fde047] hover:text-black dark:hover:text-black px-2 py-1 brutal-border transition-colors">Artikel</Link>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-3 py-2 brutal-border transition-colors"
              aria-label="GitHub"
            >
              <span className="font-mono text-base font-black leading-none">[↗]</span>
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-12 border-t-[3px] border-black dark:border-white border-dashed pt-8 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-black bg-[#fde047] inline-block px-4 py-2 brutal-border brutal-shadow">
            © {new Date().getFullYear()} MediaHub
          </p>
        </div>
      </div>
    </footer>
  );
}
