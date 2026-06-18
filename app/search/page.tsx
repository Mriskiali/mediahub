import type { Metadata } from 'next';
import { getPosts } from '@/lib/actions/posts';
import { PostGrid } from '@/components/posts/PostGrid';
import { Pagination } from '@/components/ui/Pagination';

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: `Pencarian: ${q || ''}`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, page } = await searchParams;
  const query = q || '';
  
  const currentPage = Number(page) || 1;
  const limit = 6;
  const skip = (currentPage - 1) * limit;

  const { data: posts, total } = await getPosts({
    published: true,
    search: query,
    limit,
    skip,
  });
  const totalPages = Math.ceil((total || 0) / limit);

  const createPageUrl = (pageNumber: number) => {
    return `/search?q=${encodeURIComponent(query)}&page=${pageNumber}#posts-list`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-white dark:bg-black transition-colors min-h-[calc(100vh-16rem)]">
      {/* Header */}
      <div className="mb-12" id="posts-list">
        <div className="mb-6 inline-flex items-center gap-4 bg-[#fde047] px-6 py-4 brutal-border brutal-shadow">
          <span className="font-mono text-2xl font-black text-black leading-none">[?]</span>
          <h1 className="text-4xl font-black text-black uppercase tracking-widest">
            Hasil Pencarian
          </h1>
        </div>
        {query ? (
          <p className="text-xl font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider mb-4 max-w-2xl">
            Menampilkan hasil untuk: <span className="bg-black text-white dark:bg-white dark:text-black px-2 py-1">{query}</span>
          </p>
        ) : (
          <p className="text-xl font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider mb-4 max-w-2xl">
            Masukkan kata kunci untuk memulai pencarian.
          </p>
        )}
        <p className="text-sm font-black text-black dark:text-white uppercase tracking-wider bg-[#e4e4e7] dark:bg-zinc-800 inline-block px-3 py-1 brutal-border">
          {total || 0} konten ditemukan
        </p>
      </div>

      {/* Grid */}
      {posts && posts.length > 0 ? (
        <PostGrid posts={posts} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 brutal-border bg-gray-50 dark:bg-zinc-900 brutal-shadow">
          <span className="font-mono text-5xl font-black mb-4">[-_-]</span>
          <h2 className="text-2xl font-bold uppercase tracking-widest">Tidak ada hasil</h2>
          <p className="text-gray-500 font-medium">Coba gunakan kata kunci lain.</p>
        </div>
      )}

      {posts && posts.length > 0 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          createPageUrl={createPageUrl} 
        />
      )}
    </div>
  );
}
