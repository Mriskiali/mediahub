import { PostCard } from './PostCard';
import type { PostGridProps } from '@/types';

export function PostGrid({ posts }: PostGridProps) {
  if (!posts.length) {
    return (
      <div className="flex flex-col items-center justify-center border-4 border-black dark:border-white border-dashed bg-[#e4e4e7] dark:bg-zinc-800 py-24 text-center brutal-shadow transition-colors">
        <span className="font-mono text-5xl font-black text-black dark:text-white mb-6 leading-none">[###]</span>
        <h3 className="text-black font-bold uppercase tracking-widest text-xl mb-2 bg-[#fde047] px-4 py-2 brutal-border inline-block">Tidak ada postingan</h3>
        <p className="text-base font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider mt-4">Konten akan muncul di sini setelah postingan diterbitkan.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
