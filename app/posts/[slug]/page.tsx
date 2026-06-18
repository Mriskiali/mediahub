import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPostBySlug, getRelatedPosts } from '@/lib/actions/posts';
import { PostDetail } from '@/components/posts/PostDetail';
import { PostGrid } from '@/components/posts/PostGrid';
import Link from 'next/link';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Postingan Tidak Ditemukan' };
  }

  return {
    title: post.title,
    description: post.excerpt ?? `Postingan ${post.mediaType.toLowerCase()} di MediaHub.`,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.thumbnailUrl ? [post.thumbnailUrl] : undefined,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const { data: post } = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { data: relatedPosts } = await getRelatedPosts(post.id, post.tags, post.mediaType);

  return (
    <div className="bg-white dark:bg-black transition-colors min-h-screen">
      <PostDetail post={post} />
      
      {/* Related Posts Section */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 border-t-8 border-black dark:border-white">
          <div className="mb-10 flex items-center gap-3 bg-[#facc15] px-4 py-2 brutal-border brutal-shadow inline-flex">
            <span className="font-mono text-xl font-black leading-none text-black">[🔗]</span>
            <h2 className="text-2xl font-black uppercase tracking-widest text-black">
              Mungkin Anda Suka
            </h2>
          </div>
          <PostGrid posts={relatedPosts} />
        </section>
      )}
    </div>
  );
}
