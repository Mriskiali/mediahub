'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { signOut } from '@/lib/actions/auth';

const sidebarItems = [
  { href: '/admin', label: 'Dasbor', icon: '[O]', exact: true },
  { href: '/admin/posts', label: 'Semua Postingan', icon: '[≡]', exact: true },
  { href: '/admin/posts/new', label: 'Postingan Baru', icon: '[+]' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r-4 border-black dark:border-white bg-[#e4e4e7] dark:bg-zinc-900 transition-colors">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b-4 border-black dark:border-white px-5 bg-white dark:bg-black transition-colors">
        <div className="flex h-10 w-10 items-center justify-center bg-[#fde047] brutal-border brutal-shadow">
          <span className="text-black font-black text-xl leading-none" aria-hidden="true">⚡</span>
        </div>
        <div>
          <p className="font-bold text-sm text-black dark:text-white uppercase tracking-widest">
            Media<span className="text-[#f87171]">Hub</span>
          </p>
          <p className="text-[10px] font-bold text-black bg-[#facc15] px-1 inline-block brutal-border uppercase">Admin</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-3 p-4">
        {sidebarItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center justify-between px-4 py-3 text-sm font-bold uppercase tracking-wider brutal-border transition-all',
                isActive
                  ? 'bg-black text-white dark:bg-white dark:text-black brutal-shadow'
                  : 'bg-white text-black dark:bg-black dark:text-white hover:bg-[#4ade80] dark:hover:bg-[#4ade80] dark:hover:text-black brutal-shadow brutal-shadow-hover'
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'font-mono text-xl font-black leading-none',
                    isActive ? 'text-white dark:text-black' : 'text-black dark:text-white group-hover:text-black'
                  )}
                >
                  {item.icon}
                </span>
                {item.label}
              </div>
              {isActive && <span className="font-mono text-lg font-black text-white dark:text-black">[→]</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t-4 border-black dark:border-white p-4 bg-white dark:bg-black transition-colors">
        <Link
          href="/"
          className="group flex w-full items-center justify-center gap-2 bg-[#60a5fa] dark:bg-[#60a5fa] px-3 py-2 text-sm font-bold uppercase tracking-wider text-black brutal-border brutal-shadow brutal-shadow-hover hover:bg-[#3b82f6] transition-all"
        >
          <span className="font-mono text-xl font-black leading-none text-black">[←]</span>
          Beranda Publik
        </Link>

        <form action={signOut} className="w-full">
          <button
            type="submit"
            id="admin-sidebar-logout"
            className="group flex w-full items-center justify-center gap-2 bg-white dark:bg-black px-3 py-2 text-sm font-bold uppercase tracking-wider text-black dark:text-white brutal-border brutal-shadow brutal-shadow-hover hover:bg-[#f87171] dark:hover:bg-[#f87171] dark:hover:text-black transition-all"
          >
            <span className="font-mono text-xl font-black leading-none text-black dark:text-white group-hover:text-black">[✕]</span>
            Keluar
          </button>
        </form>
      </div>
    </aside>
  );
}
