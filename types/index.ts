// Types shared across the entire application

export type MediaType = 'VIDEO' | 'AUDIO' | 'IMAGE' | 'ARTICLE';

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  mediaType: MediaType;
  mediaUrl: string | null;
  thumbnailUrl: string | null;
  tags: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  mediaType: MediaType;
  mediaUrl: string;
  thumbnailUrl: string;
  tags: string;
  published: boolean;
}

export interface PostCardProps {
  post: Post;
}

export interface PostDetailProps {
  post: Post;
}

export interface PostGridProps {
  posts: Post[];
}

export interface PostFormProps {
  post?: Post;
  mode: 'create' | 'edit';
}

export interface NavItem {
  label: string;
  href: string;
}

export interface AdminSidebarItem {
  label: string;
  href: string;
  icon: string;
}

export interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  videoCount: number;
  audioCount: number;
  imageCount: number;
  articleCount: number;
}
