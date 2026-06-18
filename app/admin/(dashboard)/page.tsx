import type { Metadata } from 'next';
import Link from 'next/link';
import { getDashboardStats, getPosts } from '@/lib/actions/posts';
import { formatDateShort, getMediaTypeLabel } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import type { MediaType } from '@/types';

export const metadata: Metadata = {
  title: 'Dasbor — Admin',
};

export default async function AdminDashboardPage() {
  const [{ data: stats }, { data: recentPosts }] = await Promise.all([
    getDashboardStats(),
    getPosts({ limit: 5 }),
  ]);

  const statCards = [
    {
      label: 'Total Postingan',
      value: stats?.totalPosts ?? 0,
      icon: '[≡]',
      color: 'text-black',
      bg: 'bg-[#fde047]',
    },
    {
      label: 'Diterbitkan',
      value: stats?.publishedPosts ?? 0,
      icon: '[O]',
      color: 'text-black',
      bg: 'bg-[#4ade80]',
    },
    {
      label: 'Draf',
      value: stats?.draftPosts ?? 0,
      icon: '[-]',
      color: 'text-black',
      bg: 'bg-[#facc15]',
    },
    {
      label: 'Video',
      value: stats?.videoCount ?? 0,
      icon: '[▶]',
      color: 'text-black',
      bg: 'bg-[#fde047]',
    },
    {
      label: 'Audio',
      value: stats?.audioCount ?? 0,
      icon: '[♪]',
      color: 'text-black',
      bg: 'bg-[#4ade80]',
    },
    {
      label: 'Gambar',
      value: stats?.imageCount ?? 0,
      icon: '[■]',
      color: 'text-black',
      bg: 'bg-[#f472b6]',
    },
    {
      label: 'Artikel',
      value: stats?.articleCount ?? 0,
      icon: '[B]',
      color: 'text-black',
      bg: 'bg-[#60a5fa]',
    },
  ];

  return (
    <div className="space-y-12 bg-white dark:bg-black transition-colors min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 bg-[#fde047] px-6 py-3 brutal-border brutal-shadow">
          <span className="font-mono text-3xl font-black text-black leading-none">[O]</span>
          <div>
            <h1 className="text-3xl font-black text-black uppercase tracking-widest">Dasbor</h1>
            <p className="text-sm font-bold text-black uppercase tracking-wider">Gambaran umum konten multimedia Anda</p>
          </div>
        </div>
        <Link
          href="/admin/posts/new"
          id="dashboard-new-post-btn"
          className="flex items-center gap-2 bg-[#f472b6] px-6 py-3 text-sm font-black uppercase tracking-widest text-black brutal-border brutal-shadow brutal-shadow-hover hover:bg-[#ec4899] transition-all"
        >
          <span className="font-mono text-xl font-black leading-none">[+]</span>
          Postingan Baru
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        {statCards.map((card) => {
          return (
            <div
              key={card.label}
              className="bg-white dark:bg-black p-6 space-y-4 brutal-border brutal-shadow transition-colors"
            >
              <div className={`flex h-14 w-14 items-center justify-center brutal-border ${card.bg}`}>
                <span className={`font-mono text-3xl font-black leading-none ${card.color}`}>{card.icon}</span>
              </div>
              <div>
                <p className="text-4xl font-black text-black dark:text-white">{card.value}</p>
                <p className="text-sm font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mt-1">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Posts */}
      <div className="border-4 border-black dark:border-white bg-white dark:bg-black brutal-shadow overflow-hidden transition-colors">
        <div className="flex items-center justify-between px-8 py-6 border-b-4 border-black dark:border-white bg-[#e4e4e7] dark:bg-zinc-800 transition-colors">
          <h2 className="text-2xl font-black uppercase tracking-widest text-black dark:text-white">Postingan Terbaru</h2>
          <Link
            href="/admin/posts"
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-black dark:text-white bg-white dark:bg-black px-3 py-1.5 brutal-border brutal-shadow-hover hover:bg-[#60a5fa] dark:hover:bg-[#60a5fa] dark:hover:text-black transition-colors"
          >
            Lihat semua <span className="font-mono text-base font-black leading-none">[→]</span>
          </Link>
        </div>

        <div className="divide-y-4 divide-black dark:divide-white transition-colors">
          {recentPosts.length === 0 ? (
            <div className="px-8 py-12 text-center text-black dark:text-white font-bold uppercase tracking-widest">
              Belum ada postingan.{' '}
              <Link href="/admin/posts/new" className="text-[#f87171] hover:text-black hover:bg-[#fde047] inline-block px-2 transition-colors">
                Buat satu [→]
              </Link>
            </div>
          ) : (
            recentPosts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 px-8 py-6 hover:bg-[#fde047] dark:hover:bg-[#fde047] group transition-colors"
              >
                <div className="flex items-center gap-6 min-w-0">
                  <Badge mediaType={post.mediaType as MediaType} />
                  <div className="min-w-0">
                    <p className="text-lg font-black text-black dark:text-white group-hover:text-black truncate uppercase tracking-wide">{post.title}</p>
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-gray-800 uppercase">{formatDateShort(post.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  {post.published ? (
                    <span className="text-sm font-bold uppercase tracking-wider text-black bg-[#4ade80] px-2 py-1 brutal-border">Diterbitkan</span>
                  ) : (
                    <span className="text-sm font-bold uppercase tracking-wider text-black bg-[#facc15] px-2 py-1 brutal-border">Draf</span>
                  )}
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="text-sm font-bold uppercase tracking-wider text-black dark:text-white bg-white dark:bg-black group-hover:text-black px-3 py-1.5 brutal-border brutal-shadow-hover hover:bg-[#f472b6] transition-colors"
                  >
                    Edit [→]
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
