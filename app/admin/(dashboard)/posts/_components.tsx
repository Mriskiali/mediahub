'use client';

import { useState, useTransition, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { deletePost, togglePublished } from '@/lib/actions/posts';
import { formatDateShort } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';
import type { Post, MediaType } from '@/types';

interface PostsTableProps {
  initialPosts: Post[];
}

export function PostsTable({ initialPosts }: PostsTableProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Menampilkan 8 baris per halaman

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterType]);

  const filtered = initialPosts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesType = filterType === 'ALL' || p.mediaType === filterType;
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDeleteClick = (id: string) => {
    setConfirmDeleteId(id);
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const confirmDelete = () => {
    if (!confirmDeleteId) return;
    setDeletingId(confirmDeleteId);
    startTransition(async () => {
      await deletePost(confirmDeleteId);
      setDeletingId(null);
      setConfirmDeleteId(null);
      toast('Postingan berhasil dihapus', 'success');
      router.refresh();
    });
  };

  const handleTogglePublished = (id: string, current: boolean) => {
    startTransition(async () => {
      await togglePublished(id, !current);
      toast(current ? 'Postingan ditarik ke Draf' : 'Postingan Diterbitkan', 'success');
      router.refresh();
    });
  };

  const typeFilters = ['ALL', 'VIDEO', 'AUDIO', 'IMAGE', 'ARTICLE'];

  return (
    <div className="space-y-6">
      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white dark:bg-black border-4 border-black dark:border-white p-6 brutal-shadow transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#f87171] p-3 border-2 border-black brutal-shadow">
                <span className="font-mono text-2xl font-black text-black leading-none">[!]</span>
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-widest text-black dark:text-white">Hapus Postingan</h3>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Tindakan ini tidak dapat dibatalkan.</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-4">
              <Button
                variant="outline"
                onClick={cancelDelete}
                disabled={isPending}
              >
                Batal
              </Button>
              <button
                onClick={confirmDelete}
                disabled={isPending}
                className="bg-[#f87171] hover:bg-red-500 text-black px-4 py-2 font-black uppercase tracking-widest border-2 border-black brutal-shadow brutal-shadow-hover transition-all disabled:opacity-50"
              >
                {isPending ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-[#fde047] p-4 brutal-border brutal-shadow">
        <div className="relative flex-1 w-full max-w-sm">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-lg font-black text-black pointer-events-none leading-none">[Q]</span>
          <input
            type="text"
            placeholder="Cari postingan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 brutal-border bg-white dark:bg-black pl-12 pr-4 text-sm font-bold uppercase tracking-wider text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-black dark:focus:ring-white transition-all"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {typeFilters.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-2 text-xs font-black uppercase tracking-widest brutal-border transition-all ${
                filterType === type
                  ? 'bg-black text-white dark:bg-white dark:text-black brutal-shadow'
                  : 'bg-white text-black dark:bg-black dark:text-white brutal-shadow brutal-shadow-hover hover:bg-[#60a5fa] dark:hover:bg-[#60a5fa] dark:hover:text-black'
              }`}
            >
              {type === 'ALL' ? 'Semua' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="border-4 border-black dark:border-white bg-white dark:bg-black brutal-shadow overflow-hidden transition-colors">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="font-mono text-6xl font-black text-black dark:text-white mb-4 leading-none">[≡]</span>
            <p className="text-black font-black uppercase tracking-widest text-xl bg-[#facc15] px-4 py-2 brutal-border inline-block">Tidak ada postingan ditemukan</p>
            <div className="mt-4">
              <p className="text-sm font-black text-black dark:text-white uppercase tracking-wider bg-white dark:bg-black border-2 border-black dark:border-white px-3 py-1 inline-block brutal-shadow">
                {search ? 'Coba kata kunci pencarian lain' : 'Buat postingan pertama Anda untuk memulai'}
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#e4e4e7] dark:bg-zinc-800 transition-colors">
                <tr className="border-b-4 border-black dark:border-white">
                  <th className="px-6 py-4 text-left text-sm font-black text-black dark:text-white uppercase tracking-widest">
                    Postingan
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-black text-black dark:text-white uppercase tracking-widest hidden sm:table-cell">
                    Tipe
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-black text-black dark:text-white uppercase tracking-widest hidden md:table-cell">
                    Status
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-black text-black dark:text-white uppercase tracking-widest hidden lg:table-cell">
                    Tanggal
                  </th>
                  <th className="px-4 py-4 text-right text-sm font-black text-black dark:text-white uppercase tracking-widest">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-4 divide-black dark:divide-white transition-colors">
                {paginated.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-[#fde047] dark:hover:bg-[#fde047] transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-black text-lg text-black dark:text-white group-hover:text-black uppercase tracking-wider line-clamp-1 transition-colors">
                          {post.title}
                        </p>
                        {post.excerpt && (
                          <p className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-gray-800 mt-1 line-clamp-1 transition-colors">{post.excerpt}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-5 hidden sm:table-cell">
                      <Badge mediaType={post.mediaType as MediaType} />
                    </td>
                    <td className="px-4 py-5 hidden md:table-cell">
                      <button
                        onClick={() => handleTogglePublished(post.id, post.published)}
                        disabled={isPending}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-black uppercase tracking-wider brutal-border transition-all brutal-shadow brutal-shadow-hover ${
                          post.published
                            ? 'bg-[#4ade80] text-black hover:bg-emerald-400'
                            : 'bg-[#facc15] text-black hover:bg-yellow-400'
                        }`}
                      >
                        {post.published ? (
                          <span className="font-mono text-sm font-black leading-none">[O]</span>
                        ) : (
                          <span className="font-mono text-sm font-black leading-none">[-]</span>
                        )}
                        {post.published ? 'Diterbitkan' : 'Draf'}
                      </button>
                    </td>
                    <td className="px-4 py-5 text-black dark:text-white group-hover:text-black font-bold uppercase hidden lg:table-cell transition-colors">
                      {formatDateShort(post.createdAt)}
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/posts/${post.slug}`}
                          target="_blank"
                          className="bg-white dark:bg-black px-2 py-1 brutal-border brutal-shadow brutal-shadow-hover hover:bg-[#60a5fa] dark:hover:bg-[#60a5fa] transition-all text-black dark:text-white dark:hover:text-black"
                          title="Lihat postingan"
                        >
                          <span className="font-mono text-base font-black leading-none">[O]</span>
                        </Link>
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="bg-white dark:bg-black px-2 py-1 brutal-border brutal-shadow brutal-shadow-hover hover:bg-[#f472b6] dark:hover:bg-[#f472b6] transition-all text-black dark:text-white dark:hover:text-black"
                          title="Edit postingan"
                        >
                          <span className="font-mono text-base font-black leading-none">[/]</span>
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(post.id)}
                          disabled={deletingId === post.id || isPending}
                          className="bg-white dark:bg-black px-2 py-1 brutal-border brutal-shadow brutal-shadow-hover hover:bg-[#f87171] dark:hover:bg-[#f87171] transition-all text-black dark:text-white dark:hover:text-black disabled:opacity-50"
                          title="Hapus postingan"
                        >
                          <span className="font-mono text-base font-black leading-none">[X]</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="bg-white dark:bg-black border-4 border-black dark:border-white px-4 py-2 brutal-shadow">
          <p className="text-sm font-black uppercase tracking-widest text-black dark:text-white">
            TOTAL:{' '}
            <span className="bg-[#fde047] text-black px-2 py-0.5 border-2 border-black inline-block mx-1">
              {filtered.length}
            </span>{' '}
            POSTINGAN
          </p>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-2 font-mono">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center justify-center bg-white dark:bg-black text-black dark:text-white px-3 py-1.5 brutal-border brutal-shadow brutal-shadow-hover hover:bg-[#facc15] dark:hover:bg-[#facc15] hover:text-black dark:hover:text-black transition-colors font-bold uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              [←] Prev
            </button>
            <div className="flex items-center justify-center bg-black dark:bg-white text-white dark:text-black px-3 py-1.5 brutal-border font-black uppercase tracking-widest text-xs">
              {currentPage} / {totalPages}
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center bg-white dark:bg-black text-black dark:text-white px-3 py-1.5 brutal-border brutal-shadow brutal-shadow-hover hover:bg-[#facc15] dark:hover:bg-[#facc15] hover:text-black dark:hover:text-black transition-colors font-bold uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next [→]
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface AdminPostsPageWrapperProps {
  posts: Post[];
}

export function AdminPostsPageWrapper({ posts }: AdminPostsPageWrapperProps) {
  return (
    <div className="space-y-10 min-h-screen">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-black uppercase tracking-widest bg-[#4ade80] inline-block px-4 py-2 brutal-border brutal-shadow">Semua Postingan</h1>
          <div className="mt-4">
            <p className="text-sm font-black text-black dark:text-white uppercase tracking-wider bg-white dark:bg-black border-2 border-black dark:border-white px-3 py-1 inline-block brutal-shadow">
              Kelola konten multimedia Anda
            </p>
          </div>
        </div>
        <Link
          href="/admin/posts/new"
          id="posts-new-post-btn"
          className="flex items-center gap-2 bg-[#f472b6] px-6 py-3 text-sm font-black uppercase tracking-widest text-black brutal-border brutal-shadow brutal-shadow-hover hover:bg-[#ec4899] transition-all"
        >
          <span className="font-mono text-lg font-black leading-none">[+]</span>
          Postingan Baru
        </Link>
      </div>
      <PostsTable initialPosts={posts} />
    </div>
  );
}
