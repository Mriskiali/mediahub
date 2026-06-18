import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  createPageUrl: (page: number) => string;
}

export function Pagination({ currentPage, totalPages, createPageUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-12 font-mono">
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="flex items-center justify-center bg-white dark:bg-black text-black dark:text-white px-4 py-2 brutal-border brutal-shadow brutal-shadow-hover hover:bg-[#facc15] dark:hover:bg-[#facc15] hover:text-black dark:hover:text-black transition-colors font-bold uppercase tracking-widest text-sm"
        >
          [←] Prev
        </Link>
      ) : (
        <span className="flex items-center justify-center bg-gray-200 dark:bg-zinc-800 text-gray-400 dark:text-gray-500 px-4 py-2 brutal-border font-bold uppercase tracking-widest text-sm cursor-not-allowed">
          [←] Prev
        </span>
      )}

      <div className="flex items-center justify-center bg-black dark:bg-white text-white dark:text-black px-4 py-2 brutal-border brutal-shadow font-black uppercase tracking-widest text-sm">
        Halaman {currentPage} dari {totalPages}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="flex items-center justify-center bg-white dark:bg-black text-black dark:text-white px-4 py-2 brutal-border brutal-shadow brutal-shadow-hover hover:bg-[#facc15] dark:hover:bg-[#facc15] hover:text-black dark:hover:text-black transition-colors font-bold uppercase tracking-widest text-sm"
        >
          Next [→]
        </Link>
      ) : (
        <span className="flex items-center justify-center bg-gray-200 dark:bg-zinc-800 text-gray-400 dark:text-gray-500 px-4 py-2 brutal-border font-bold uppercase tracking-widest text-sm cursor-not-allowed">
          Next [→]
        </span>
      )}
    </div>
  );
}
