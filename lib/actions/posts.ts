'use server';

import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/utils';
import type { MediaType, PostFormData } from '@/types';

// Cached fetchers
const getCachedPosts = unstable_cache(
  async (options?: {
    mediaType?: MediaType;
    published?: boolean;
    limit?: number;
    skip?: number;
    search?: string;
  }) => {
    let where: any = {
      ...(options?.mediaType ? { mediaType: options.mediaType } : {}),
      ...(options?.published !== undefined ? { published: options.published } : {}),
    };

    if (options?.search) {
      where = {
        ...where,
        OR: [
          { title: { contains: options.search, mode: 'insensitive' } },
          { content: { contains: options.search, mode: 'insensitive' } },
          { excerpt: { contains: options.search, mode: 'insensitive' } },
        ],
      };
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: options?.limit,
        skip: options?.skip,
      }),
      prisma.post.count({ where }),
    ]);

    return { data: posts, total, error: null };
  },
  ['posts-list'],
  { tags: ['posts'] }
);

const getCachedRelatedPosts = unstable_cache(
  async (currentId: string, currentTags: string[], currentMediaType: string) => {
    // Cari postingan yang diterbitkan, tidak sama dengan currentId
    // dan memiliki irisan tags (opsional) atau memiliki mediaType yang sama
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        id: { not: currentId },
        OR: [
          { tags: { hasSome: currentTags.length > 0 ? currentTags : ['__never__'] } },
          { mediaType: currentMediaType as MediaType }
        ]
      },
      orderBy: { createdAt: 'desc' },
      take: 3,
    });
    return { data: posts, error: null };
  },
  ['related-posts'],
  { tags: ['posts'] }
);

const getCachedPostBySlug = unstable_cache(
  async (slug: string) => {
    const post = await prisma.post.findUnique({ where: { slug } });
    return { data: post, error: null };
  },
  ['post-by-slug'],
  { tags: ['posts'] }
);

const getCachedPostById = unstable_cache(
  async (id: string) => {
    const post = await prisma.post.findUnique({ where: { id } });
    return { data: post, error: null };
  },
  ['post-by-id'],
  { tags: ['posts'] }
);

const getCachedDashboardStats = unstable_cache(
  async () => {
    const [total, published, video, audio, image, article] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { published: true } }),
      prisma.post.count({ where: { mediaType: 'VIDEO' } }),
      prisma.post.count({ where: { mediaType: 'AUDIO' } }),
      prisma.post.count({ where: { mediaType: 'IMAGE' } }),
      prisma.post.count({ where: { mediaType: 'ARTICLE' } }),
    ]);
    return {
      data: {
        totalPosts: total,
        publishedPosts: published,
        draftPosts: total - published,
        videoCount: video,
        audioCount: audio,
        imageCount: image,
        articleCount: article,
      },
      error: null,
    };
  },
  ['dashboard-stats'],
  { tags: ['posts'] }
);

export async function getPosts(options?: {
  mediaType?: MediaType;
  published?: boolean;
  limit?: number;
  skip?: number;
  search?: string;
}) {
  try {
    return await getCachedPosts(options);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { data: [], total: 0, error: 'Failed to fetch posts.' };
  }
}

export async function getRelatedPosts(currentId: string, currentTags: string[], currentMediaType: string) {
  try {
    return await getCachedRelatedPosts(currentId, currentTags, currentMediaType);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return { data: [], error: 'Failed to fetch related posts.' };
  }
}

export async function getPostBySlug(slug: string) {
  try {
    return await getCachedPostBySlug(slug);
  } catch (error) {
    console.error('Error fetching post:', error);
    return { data: null, error: 'Failed to fetch post.' };
  }
}

export async function getPostById(id: string) {
  try {
    return await getCachedPostById(id);
  } catch (error) {
    console.error('Error fetching post:', error);
    return { data: null, error: 'Failed to fetch post.' };
  }
}

export async function getDashboardStats() {
  try {
    return await getCachedDashboardStats();
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return { data: null, error: 'Failed to fetch stats.' };
  }
}

export async function createPost(formData: PostFormData) {
  try {
    const slug = formData.slug || slugify(formData.title);
    const tags = formData.tags
      ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    await prisma.post.create({
      data: {
        title: formData.title,
        slug,
        excerpt: formData.excerpt || null,
        content: formData.content || null,
        mediaType: formData.mediaType,
        mediaUrl: formData.mediaUrl || null,
        thumbnailUrl: formData.thumbnailUrl || null,
        tags,
        published: formData.published,
      },
    });

    revalidateTag('posts');
    revalidatePath('/');
    revalidatePath('/admin/posts');
    return { error: null };
  } catch (error) {
    console.error('Error creating post:', error);
    return { error: 'Failed to create post. The slug may already exist.' };
  }
}

export async function updatePost(id: string, formData: PostFormData) {
  try {
    const slug = formData.slug || slugify(formData.title);
    const tags = formData.tags
      ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    await prisma.post.update({
      where: { id },
      data: {
        title: formData.title,
        slug,
        excerpt: formData.excerpt || null,
        content: formData.content || null,
        mediaType: formData.mediaType,
        mediaUrl: formData.mediaUrl || null,
        thumbnailUrl: formData.thumbnailUrl || null,
        tags,
        published: formData.published,
      },
    });

    revalidateTag('posts');
    revalidatePath('/');
    revalidatePath('/admin/posts');
    revalidatePath(`/posts/${slug}`);
    return { error: null };
  } catch (error) {
    console.error('Error updating post:', error);
    return { error: 'Failed to update post.' };
  }
}

export async function deletePost(id: string) {
  try {
    await prisma.post.delete({ where: { id } });
    revalidateTag('posts');
    revalidatePath('/');
    revalidatePath('/admin/posts');
    return { error: null };
  } catch (error) {
    console.error('Error deleting post:', error);
    return { error: 'Failed to delete post.' };
  }
}

export async function togglePublished(id: string, published: boolean) {
  try {
    await prisma.post.update({ where: { id }, data: { published } });
    revalidateTag('posts');
    revalidatePath('/');
    revalidatePath('/admin/posts');
    return { error: null };
  } catch (error) {
    console.error('Error toggling published:', error);
    return { error: 'Failed to update post status.' };
  }
}
