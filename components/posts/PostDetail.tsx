import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { AudioPlayer } from '@/components/media/AudioPlayer';
import { VideoEmbed } from '@/components/media/VideoEmbed';
import { ImageGallery } from '@/components/media/ImageGallery';
import { formatDate, isValidImageUrl, calculateReadingTime } from '@/lib/utils';
import type { PostDetailProps } from '@/types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function PostDetail({ post }: PostDetailProps) {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 bg-white dark:bg-black transition-colors">
      {/* Back */}
      <Link
        href="/"
        className="mb-10 inline-flex items-center gap-2 px-3 py-1.5 text-sm font-bold uppercase tracking-wider text-black dark:text-white bg-white dark:bg-black brutal-border brutal-shadow brutal-shadow-hover hover:bg-[#fde047] dark:hover:bg-[#fde047] dark:hover:text-black transition-all"
      >
        <span className="font-mono text-base font-black leading-none">[←]</span>
        Kembali
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="mb-6 flex items-center gap-4">
          <Badge mediaType={post.mediaType} />
          {!post.published && (
            <span className="bg-[#facc15] brutal-border px-3 py-1 text-xs font-bold uppercase tracking-wider text-black brutal-shadow">
              Draf
            </span>
          )}
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-black leading-none mb-6 uppercase tracking-tight bg-[#facc15] inline-block px-4 py-2 brutal-border brutal-shadow">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-xl font-bold text-black dark:text-white bg-white dark:bg-black brutal-border p-4 brutal-shadow mt-6">{post.excerpt}</p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-6 text-sm font-bold uppercase tracking-wider text-black dark:text-white">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white dark:bg-black brutal-border px-3 py-1.5 brutal-shadow">
              <span className="font-mono text-base font-black leading-none">[CAL]</span>
              <time dateTime={new Date(post.createdAt).toISOString()}>{formatDate(post.createdAt)}</time>
            </div>
            <div className="bg-black text-white dark:bg-white dark:text-black px-3 py-1.5 brutal-border brutal-shadow">
              {calculateReadingTime(post.content, post.mediaType)}
            </div>
          </div>
          {post.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-base font-black leading-none flex-shrink-0">[#]</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#e4e4e7] dark:bg-zinc-800 brutal-border px-2 py-1 text-xs text-black dark:text-white brutal-shadow"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Divider */}
      <div className="mb-10 border-t-4 border-black dark:border-white border-dashed transition-colors" />

      {/* Thumbnail (for article/non-media types with thumbnails) */}
      {isValidImageUrl(post.thumbnailUrl) && post.mediaType === 'ARTICLE' && (
        <div className="relative mb-10 aspect-video overflow-hidden brutal-border brutal-shadow bg-[#fde047]">
          <Image
            src={post.thumbnailUrl!}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Media Section */}
      {post.mediaType === 'VIDEO' && post.mediaUrl && (
        <div className="mb-10">
          <VideoEmbed src={post.mediaUrl} title={post.title} />
        </div>
      )}

      {post.mediaType === 'AUDIO' && post.mediaUrl && (
        <div className="mb-10">
          <AudioPlayer
            src={post.mediaUrl}
            title={post.title}
            coverUrl={post.thumbnailUrl ?? undefined}
          />
        </div>
      )}

      {post.mediaType === 'IMAGE' && post.mediaUrl && (
        <div className="mb-10">
          <ImageGallery
            images={[{ src: post.mediaUrl, alt: post.title }]}
          />
        </div>
      )}

      {/* Content */}
      {post.content && (
        <div className="prose dark:prose-invert max-w-none prose-headings:text-black dark:prose-headings:text-white prose-headings:font-black prose-headings:uppercase prose-headings:tracking-wide prose-p:text-black dark:prose-p:text-gray-200 prose-p:font-medium prose-p:text-lg prose-a:bg-[#fde047] prose-a:text-black prose-a:font-bold prose-a:no-underline hover:prose-a:bg-black hover:prose-a:text-white dark:hover:prose-a:bg-white dark:hover:prose-a:text-black prose-code:bg-[#e4e4e7] dark:prose-code:bg-zinc-800 prose-code:text-black dark:prose-code:text-white prose-code:border-2 prose-code:border-black dark:prose-code:border-white prose-code:px-1 prose-blockquote:border-l-8 prose-blockquote:border-black dark:prose-blockquote:border-white prose-blockquote:bg-[#4ade80] dark:prose-blockquote:text-black prose-blockquote:p-4 prose-blockquote:font-bold prose-img:border-4 prose-img:border-black dark:prose-img:border-white prose-img:rounded-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
      )}
    </article>
  );
}
