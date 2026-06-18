import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPostById } from '@/lib/actions/posts';
import { PostForm } from '@/components/posts/PostForm';
import type { Post } from '@/types';

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EditPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const { data: post } = await getPostById(id);
  return { title: post ? `Edit: ${post.title} — Admin` : 'Edit Postingan — Admin' };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const { data: post } = await getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 min-h-screen">
      <div className="flex items-center gap-4 bg-[#facc15] px-6 py-4 brutal-border brutal-shadow">
        <span className="font-mono text-4xl font-black text-black leading-none">[/]</span>
        <div>
          <h1 className="text-3xl font-black text-black uppercase tracking-widest">Edit Postingan</h1>
          <p className="text-sm font-bold text-black uppercase tracking-wider mt-1 line-clamp-1">{post.title}</p>
        </div>
      </div>
      <PostForm post={post as Post} mode="edit" />
    </div>
  );
}
