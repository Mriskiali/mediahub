import type { Metadata } from 'next';
import { PostForm } from '@/components/posts/PostForm';

export const metadata: Metadata = {
  title: 'Postingan Baru — Admin',
};

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 min-h-screen">
      <div className="flex items-center gap-4 bg-[#facc15] px-6 py-4 brutal-border brutal-shadow">
        <span className="font-mono text-4xl font-black text-black leading-none">[+]</span>
        <div>
          <h1 className="text-3xl font-black text-black uppercase tracking-widest">Buat Postingan Baru</h1>
          <p className="text-sm font-bold text-black uppercase tracking-wider mt-1">Tambahkan postingan multimedia baru ke portal</p>
        </div>
      </div>
      <PostForm mode="create" />
    </div>
  );
}
