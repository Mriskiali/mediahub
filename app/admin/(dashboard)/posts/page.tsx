import type { Metadata } from 'next';
import { getPosts } from '@/lib/actions/posts';
import { AdminPostsPageWrapper } from './_components';
import type { Post } from '@/types';

export const metadata: Metadata = {
  title: 'All Posts — Admin',
};

export default async function AdminPostsPage() {
  const { data: posts } = await getPosts();

  return <AdminPostsPageWrapper posts={posts as Post[]} />;
}
