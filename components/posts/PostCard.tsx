'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { formatDateShort, truncate, isValidImageUrl, calculateReadingTime } from '@/lib/utils';
import type { Post, PostCardProps } from '@/types';

const mediaTypeIcons: Record<Post['mediaType'], React.ReactNode> = {
  VIDEO: <span className="font-mono text-xl font-black text-black leading-none">[▶]</span>,
  AUDIO: <span className="font-mono text-xl font-black text-black leading-none">[♪]</span>,
  IMAGE: <span className="font-mono text-xl font-black text-black leading-none">[■]</span>,
  ARTICLE: <span className="font-mono text-xl font-black text-black leading-none">[≡]</span>,
};

const mediaTypeBgColors: Record<Post['mediaType'], string> = {
  VIDEO: 'bg-[#fde047]', // Yellow
  AUDIO: 'bg-[#4ade80]', // Green
  IMAGE: 'bg-[#f472b6]', // Pink
  ARTICLE: 'bg-[#60a5fa]', // Blue
};

export function PostCard({ post }: PostCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={`/posts/${post.slug}`} id={`post-card-${post.id}`}>
      <article className="group relative overflow-hidden bg-white dark:bg-black brutal-border brutal-shadow brutal-shadow-hover transition-all duration-200 h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-[#e4e4e7] dark:bg-zinc-800 flex-shrink-0 border-b-[3px] border-black dark:border-white transition-colors">
          {isValidImageUrl(post.thumbnailUrl) && !imgError ? (
            <Image
              src={post.thumbnailUrl!}
              alt={post.title}
              fill
              unoptimized={true}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className={`flex h-full w-full items-center justify-center ${mediaTypeBgColors[post.mediaType]}`}
            >
              <div className="flex h-16 w-16 items-center justify-center bg-white brutal-border brutal-shadow">
                {mediaTypeIcons[post.mediaType]}
              </div>
            </div>
          )}
          {/* Badge on image */}
          <div className="absolute top-4 left-4">
            <Badge mediaType={post.mediaType} />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <h2 className="font-bold text-black dark:text-white group-hover:text-black dark:group-hover:text-black hover:bg-[#fde047] inline transition-colors duration-200 text-xl leading-tight mb-3 uppercase tracking-wide">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3 mb-5 flex-1">
              {post.excerpt}
            </p>
          )}

          <div className="mt-auto space-y-3 pt-4 border-t-[3px] border-black dark:border-white border-dashed transition-colors">
            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-bold uppercase tracking-wider text-black dark:text-white bg-[#e4e4e7] dark:bg-zinc-800 brutal-border px-2 py-1 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Date & Reading Time */}
            <div className="flex items-center justify-between gap-2 text-sm font-bold text-black dark:text-white uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-black leading-none">[CAL]</span>
                <span>{formatDateShort(post.createdAt)}</span>
              </div>
              <span className="bg-black text-white dark:bg-white dark:text-black px-2 py-1 text-xs brutal-border brutal-shadow">
                {calculateReadingTime(post.content, post.mediaType)}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
